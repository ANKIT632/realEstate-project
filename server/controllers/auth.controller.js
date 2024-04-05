const user_model = require('../models/user.model.js');

exports.registerUser = (req, res) => {
    //get user 
    const { username, email, password } = req.body;

    // create user
    try {
        const user = user_model.create({ username, email, password });
        return res.status(200).send(user);
    }
    catch (err) {
        res.status(500).send({ message: 'Error while creating user' });
    }



}