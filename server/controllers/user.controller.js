// Update use info
const user_model = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
const { secret_key } = require('../configs/auth.config.js');


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

    jwt.sign({ email: updateUser.email, _id: req.params.userId, role: updateUser.role }, secret_key, (err, token) => {
      console.log('token :', token);
      if (err) {

        return res.status(500).send({ status: "failed", message: 'Error while generating token try again !!' });
      }

      return res.status(200).send({
        status: "success",
        access_token: token,
        user: {
           status: "success",
          _id: updateUser._id,
          username: updateUser.username,
          email: updateUser.email,
          role: updateUser.role,
          profile_url: updateUser.profile_url
        }
      });

    }, { expiresIn: '5days' });


    return res.status(200).send({
       status: "success", message: 'User info updated successfully',
    });

  } catch (err) {

    // error get from model validation
    console.log('error while updating user info', err);
    if (err.name === 'ValidationError') {
      return res.status(400).send({status: "failed", message: err.message });
    }
  }
  return res.status(500).send({status: "failed", message: 'Error while updating user info, check Id or try again' });
}



// get  All user
exports.getAllUser = async (req, res) => {

  try {
    const page = parseInt(req.query.page)||1;
    const size = parseInt(req.query.size)||10;
    const userType = req.query.userType === 'seller' ? 'Seller' : 'Buyer';

    const allUser = await user_model.find({ role: userType }).skip((page - 1) * size)
    .limit(size).select("username profile_url email role");

   

    if (!allUser.length) {
      return res.status(404).send({  status: "success", message: "Data Not found" });
    }

    return res.status(200).send({
       status: "success",
      users: allUser
    });
  }
  catch (err) {
    console.log("error during get all user", err);
    return res.status(500).send({ status: "failed", message: "Try again There is some issue !!" })
  }

}


// get single user
exports.getSingleUser = async (req, res) => {

  try {
    const user = await user_model.findById(req.params.userId).select("-password -updatedAt -createdAt -phone");

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
    return res.status(500).send({ status: "failed", message: "Try again There is some issue !!" })
  }

}