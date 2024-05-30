const reviewModel = require("../models/review.model.js");

const createReview = async (req, res) => {

    const { property, rating, about } = req.body;

    try {
        await reviewModel.create({ user: req.user._id, property, rating, about });
        res.status(200).send({ status: "success" });
    }
    catch (err) {
        res.status(500).send({ status: "failed", message: err.message });
    }

}

const getAllReview = async (req, res) => {
    try {
        const totalReview = await reviewModel.countDocuments();
        const allReview = await reviewModel.find().sort({ createdAt: -1 }).populate('user', 'username profile_url socialUrls email createdAt');

        res.status(200).send({ status: "success", totalReview, data: allReview });
    }
    catch (err) {
        res.status(500).send({ status: "failed", message: err.message });
    }
}

module.exports = { createReview, getAllReview };