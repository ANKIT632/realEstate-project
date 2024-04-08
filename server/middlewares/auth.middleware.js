const user_model = require('../models/user.model.js');
const {secret_key} =require('../configs/auth.config.js');


const jwt=require('jsonwebtoken');

const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

const validateSignUpData=async (req,res,next)=>{
 const {username,email,password,role}=req.body;



 if(!username || !email || !password|| !role){
     return res.status(400).send({message:'username,email and password are required'});
 }

 if(password.length<6){
        return res.status(400).send({message:'password must be atleast 6 characters'});
  }
 
 
  if (!emailRegex.test(email)) {

    return res.status(400).send({ message: 'Invalid email address.' });
  }

  try{
    if( await user_model.findOne({email})){
      return res.status(400).send({message:'Email already exists ,please login'});
    }
  }
  catch(err){
   return res.status(500).send({message:"server error"});
  }
  next();

}

const validateSignInData=async(req,res,next)=>{
  const {email,password}=req.body;

  if(!password || !email){
    return res.status(400).send({message:'please Enter your Email and password'});
  }

  if (!emailRegex.test(email)) {

    return res.status(400).send({ message: 'Invalid email address.' });
  }


  if(! await user_model.find({email})){
     return res.status(404).send({message:'Email does not exist,please sign up'});
  }

  
  next();
}

const verifyToken=(req,res,next)=>{

  // Get token with bearer from header.
  const authHeader = req.headers.authorization;
 

  
  if(authHeader) {
      const token = authHeader.split(' ')[1]; 
      console.log("add bY auth",secret_key);
      jwt.verify(token, secret_key, (err, user) => {
          if (err) {
              return res.status(403).send({ message: 'Token is not valid' });
          }
          req.user = user;

         
        
      });
      next();

  } else {
      res.status(403).send({ message: 'No token provided !!' });
  }
}

module.exports={
  validateSignUpData,
validateSignInData,
verifyToken};