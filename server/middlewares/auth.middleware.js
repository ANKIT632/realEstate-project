const user_model = require('../models/user.model.js');
const { secret_key } = require('../configs/auth.config.js');


const jwt = require('jsonwebtoken');

// sign up validation
const validateSignUpData = async (req, res, next) => {


  if (req.body.role === 'seller' || req.body.role === 'buyer') {
    req.body.role = req.body.role === 'seller' ? 'Seller' : 'Buyer';
  }

  const { username, email, password, role } = req.body;



  if (role !== 'Seller' && role !== 'Buyer') {
    return res.status(400).send({ status: "failed", message: 'role must Seller or Buyer' });
  }

  if (!username || !email || !password || !role) {
    return res.status(400).send({ status: "failed", message: 'username,email,password,role are required' });
  }


  try {
    if (await user_model.findOne({ email }).select('email')) {
      return res.status(400).send({ status: "failed", message: 'Email already exists ,please login' });
    }
    next();
  }
  catch (err) {
    return res.status(500).send({ status: "failed", message: "server error" });
  }


}

// sign in validation
const validateSignInData = async (req, res, next) => {
  const { email, password } = req.body;

  const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  if(!regex.test(email)){
    return res.status(400).send({ status: "failed", message: 'Email is not valid' });
  }

  if (!password || !email) {
    return res.status(400).send({ status: "failed", message: 'please Enter your Email and password' });
  }

  next();
}


// verify token

const verifyToken = (req, res, next) => {

  // Get token with bearer from header.
  const authHeader = req.headers.authorization;


  try {
    if (authHeader) {
      const token = authHeader.split(' ')[1];
    

      jwt.verify(token, secret_key, (err, user) => {
        if (err) {
          return res.status(403).send({ status: "failed", message: 'Token is not valid' });
        }

        req.user = user;
        next();

      });


    } else {
      return res.status(403).send({ status: "failed", message: 'No token provided !!' });
    }
  }
  catch (err) {
    return res.send(500).send({ status: "failed", message: "error during verify token,try again" });
  }

}


module.exports = {
  validateSignUpData,
  validateSignInData,
  verifyToken
};