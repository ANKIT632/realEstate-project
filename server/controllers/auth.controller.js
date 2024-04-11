const user_model = require('../models/user.model.js');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { secret_key } = require('../configs/auth.config.js')


// signUp
exports.signUp = async (req, res) => {
    //get user 
    const { username, email, password,role } = req.body;

    // create user
    try {
        const user = await user_model.create({ username, email, password ,role});
        console.log("user",user);
        return res.status(200).send({ status: "success"});
    }
    catch (err) {
        res.status(500).send({status: "failed", message: 'Error while creating user' });
    }

}

// signIn

exports.signIn = async (req, res) => {
    //get data
    const { email, password } = req.body;

    // verify password

    try {

        // get id and hashpassword
        const user = await user_model.findOne({ email }).select('password _id username profile_url role');

        console.log("user",user);

        if(!user){
            return res.status(404).send({status: "failed",message:'User not found please signup'});
        }
        // compare password with hashpassword
        if (bcrypt.compareSync(password, user.password)) {

            jwt.sign({ email ,_id:user._id,role:user.role}, secret_key, (err,token) => {
                console.log('token :', token);
                if (err) {
                    return res.status(500).send({status: "failed", message: 'Error while generating token' });
                }

                return res.status(200).send({
                    status: "success",
                    message: 'Login successfull',
                    access_token: token,
                    user: {
                        _id: user._id,
                        username: user.username,
                        email,
                        role:user.role,
                        profile_url: user.profile_url
                    }
                });

            }, { expiresIn: '5days' });

        }

        else {
            return res.status(400).send({status: "failed", message: 'Wrong Password!!' });
        }
    }
    catch (err) {
        console.log('error while signing in',err);
        return res.status(500).send({ status: "failed",message: 'Error while signing in try again !' });
    }

} 


  