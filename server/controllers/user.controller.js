// Update use info
const user_model = require('../models/user.model.js');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});


// update user data

exports.updateUser = async (req, res) => {

  try {


    // Find the user
    const user = await user_model.findById(req.user._id);
    const password = req.body.password;
    const new_password = req.body.newPassword;

    if (!user) {
      return res.status(404).send({ status: "failed", message: 'User not found' });
    }

    if (req.file && user) {

      // Convert the file data to a base64 string
      const base64Image = req.file.buffer.toString('base64');

      // Upload the image to Cloudinary
      const photo = await cloudinary.uploader.upload("data:image/jpeg;base64," + base64Image, { resource_type: "image" });

      // The URL of the uploaded image is in result.url


      req.body.profile_url = photo.url;
    }




    if (new_password !== undefined && password !== undefined && !bcrypt.compareSync(password, user.password)) {
      return res.status(401).send({ status: "failed", message: "Wrong password !!" });
    }


    if (password !== undefined && new_password !== undefined)
      req.body.password = new_password;



    // Update the user's info
    user.set(req.body);

    // Save the user
    await user.save();

    return res.status(200).send({
      status: "success",
      message: 'update successful'
    });


  } catch (err) {

    // error get from model validation

    if (err.name === 'ValidationError') {
      return res.status(400).send({ status: "failed", message: err.message });
    }
    else {
      return res.status(500).send({ status: "failed", message: err });
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
      allUser = await user_model.find({ role: userType }).sort({ createdAt: -1 }).skip((page - 1) * size)
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

    const user = await user_model.findById(userId).select("-password -updatedAt -createdAt");

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
    const userId = req.user._id;
    const user = await user_model.findById(userId);
    const passwordByUser = req.body.password;

    if (!user) {
      return res.status(400).send({ status: "failed", message: "User Not found" });
    }


    if (bcrypt.compareSync(passwordByUser, user.password)) {
      await user_model.findByIdAndDelete(userId);
      return res.status(200).send({
        status: "success",
        message: "User deleted successfully"
      });
    }
    else {
      return res.status(401).send({
        status: "failed",
        message: "Wrong password !!"
      })
    }
  }
  catch (err) {
    return res.status(500).send({ status: "failed", message: err.message })
  }

}


