const { default: mongoose } = require('mongoose');
const property_model = require('../models/property.model.js');

const validateAddProperty = (req, res, next) => {

    const { title, description, location, price } = req.body;

    console.log(req.user.role);
    if (req.user.role !== 'Seller') {
        return res.status(403).send({status: "failed", message: 'Only seller are valid for this request !!' });
    }
    if (!title || !description || !location || !price) {
        return res.status(400).send({ status: "failed", message: 'All required field are necessary !!' });
    }
    next();
}

// validate update property

const validateUpdateProperty = async (req, res, next) => {

    try {

        if (req.body.length === 0) {
            {
                return res.status(400).send({ status: "failed", message: 'Not update found !!' });
            }
        }

        const ownerId = await property_model.findById(req.params.id).select('owner');

        if (!ownerId || !mongoose.Types.ObjectId(req.params.id)) {
            return res.status(404).send({ status: "failed", message: 'Property not found check Id' });
        }

        if (req.user._id.toString() !== ownerId.owner.toString()) {
            return res.status(403).send({ status: "failed", message: "You are not valid User to update this property" });

        }

        next();
    }

    catch (err) {
        return res.status(500).send({ status: "failed", message: "Error occur while validate update property check the Id !" });
    }


}





const validateSearchProperty = (req, res, next) => {
    const searchQuery = req.query.searchQuery;


    if (!searchQuery) {
        return res.status(400).send({ status: "failed", message: 'No search query provided' });
    }

    next();
}

module.exports = {
    validateAddProperty,
    validateUpdateProperty,
    validateSearchProperty
}