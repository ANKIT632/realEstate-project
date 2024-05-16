// Update use info
const user_model = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
const { secret_key } = require('../configs/auth.config.js');
const mongoose = require('mongoose');

// update user data

exports.updateUser = async (req, res) => {

  try {

    // Find the user
    const user = await user_model.findById(req.params.userId);

    if (!user) {
      return res.status(404).send({ status: "failed", message: 'User not found' });
    }

    // Update the user's info
    user.set(req.body);

    // Save the user
    const updateUser = await user.save();


    // generate token

    if (req.body.role) {
      jwt.sign({ email: updateUser.email, _id: req.params.userId, role: updateUser.role }, secret_key, (err, token) => {

        if (err) {

          return res.status(500).send({ status: "failed", message: 'Error while generating token try again !!' });
        }

        return res.status(200).send({
          status: "success",
          access_token: token,
        });

      }, { expiresIn: '5days' });
    }
    else {
      return res.status(200).send({
        status: "success",
      });
    }

  } catch (err) {

    // error get from model validation

    if (err.name === 'ValidationError') {
      return res.status(400).send({ status: "failed", message: err.message });
    }
    else {
      return res.status(500).send({ status: "failed", message: err.message });
    }
  }

}

// get  All user
exports.getAllUser = async (req, res) => {

  try {

    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 10;

    let userType = req.query.role;



    let allUser = [];

    if (userType) {
      allUser = await user_model.find({ role: userType }).skip((page - 1) * size)
        .limit(size).select("username profile_url email role");
    }
    else {
      allUser = await user_model.find().skip((page - 1) * size)
        .limit(size).select("username profile_url email role");
    }


    return res.status(200).send({
      status: "success",
      users: allUser
    });
  }
  catch (err) {
    return res.status(500).send({ status: "failed", message: err.message })
  }

}


// get single user
exports.getSingleUser = async (req, res) => {

  try {
    const userId = req.params.userId;

    if (userId.length !== 24 || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send({ status: "failed", message: "User id not valid" });
    }

    const user = await user_model.findById(userId).select("-password -updatedAt -createdAt -phone");

    if (!user) {
      return res.status(400).send({ status: "failed", message: "User Not found" });
    }
    else {
      return res.status(200).send({
        status: "success",
        user: user
      });
    }
  }
  catch (err) {
    return res.status(500).send({ status: "failed", message: err.message })
  }

}

// delete user
exports.deleteUser = async (req, res) => {

  try {
    const userId = req.params.userId;
    const user = await user_model.findByIdAndDelete(userId);

    if (!user) {
      return res.status(400).send({ status: "failed", message: "User Not found" });
    }
    else {
      return res.status(200).send({
        status: "success",
        message: "User deleted successfully"
      });
    }
  }
  catch (err) {
    return res.status(500).send({ status: "failed", message: err.message })
  }

}


