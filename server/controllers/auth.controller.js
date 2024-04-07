const user_model = require('../models/user.model.js');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { secret_key } = require('../configs/auth.config.js')

exports.signUp = async (req, res) => {
    //get user 
    const { username, email, password } = req.body;

    // create user
    try {
        const user = await user_model.create({ username, email, password });
        return res.status(200).send(user);
    }
    catch (err) {
        res.status(500).send({ message: 'Error while creating user' });
    }

}

exports.signIn = async (req, res) => {
    //get data
    const { email, password } = req.body;

    // verify password

    try {

        // get id and hashpassword
        const user = await user_model.findOne({ email }).select('password _id username profile_url');

        // compare password with hashpassword
        if (bcrypt.compareSync(password, user.password)) {

            jwt.sign({ email ,_id:user._id}, secret_key, (err,token) => {
                console.log('token :', token);
                if (err) {
                    return res.status(500).send({ message: 'Error while generating token' });
                }

                return res.status(200).send({
                    message: 'Login successfull',
                    access_token: token,
                    user: {
                        _id: user._id,
                        username: user.username,
                        email,
                        profile_url: user.profile_url
                    }
                });

            }, { expiresIn: '5days' })

         

        }

        else {
            return res.status(400).send({ message: 'Wrong Password!!' });
        }
    }
    catch (err) {
        return res.status(500).send({ message: 'Error while signing in try again !' });
    }

    // generate token
}