const reviewModel = require('../models/review.model.js');


const validateUserReview = async (req, res, next) => {

    const review = req.body;


    if (!review.property || !review.rating || !review.about) {
        return res.status(400).send({ status: "failed", message: "All fields are required" });
    }

    if (typeof review.rating !== 'number') {
        return res.status(400).send({ status: "failed", message: "Rating must be a number" });
    }

    next();


}

module.exports = validateUserReview;