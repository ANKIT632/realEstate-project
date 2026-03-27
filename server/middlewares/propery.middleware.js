const { default: mongoose } = require('mongoose');
const property_model = require('../models/property.model.js');

const validateOwnerPropertyId = async (req, res, next) => {
    try {
        const propertyId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(propertyId)) {
            return res.status(400).send({ status: "failed", message: 'Property id is not valid' });
        }

        if (req.user.role !== 'Seller') {
            return res.status(403).send({ status: "failed", message: 'Only seller are valid for this request !!' });
        }

        const property = await property_model.findById(propertyId).select('owner isSold');
        if (!property) {
            return res.status(404).send({ status: "failed", message: 'Property not found check Id' });
        }

        if (req.user._id.toString() !== property.owner.toString()) {
            return res.status(403).send({ status: "failed", message: 'You are not valid User to update this property' });
        }

        req.property = property;
        next();
    }
    catch (err) {
        return res.status(500).send({ status: "failed", message: err.message });
    }
};


// validate add property
const validateAddProperty = (req, res, next) => {

    const { title, description, location, price } = req.body;

    if (req.user.role !== 'Seller') {
        return res.status(403).send({ status: "failed", message: 'Only seller are valid for this request !!' });
    }
    if (!title || !description || !location || !price) {
        return res.status(400).send({ status: "failed", message: 'All required field are necessary !!' });
    }
    next();
}

// validate update property

const validateUpdateProperty = async (req, res, next) => {

    try {
        if (req.body.owner || req.body.isSold || req.body._id) {
            return res.status(400).send({ status: "failed", message: 'owner isSold _id are not update here' });
        }

        if (Object.keys(req.body).length === 0) {
            return res.status(400).send({ status: "failed", message: 'Not update found !!' });
        }

        return validateOwnerPropertyId(req, res, next);
    }

    catch (err) {
        return res.status(500).send({ status: "failed", message: err.message });
    }

}



const validateSearchProperty = (req, res, next) => {
    const searchQuery = req.query.searchQuery;


    if (!searchQuery) {
        return res.status(400).send({ status: "failed", message: 'No search query provided' });
    }

    next();
}

const validateGetAllOwnerProperty = (req, res, next) => {

    if (req.user.role === 'Buyer') {
        return res.status(403).send({ status: "failed", message: 'Only seller are valid for this request !!' });
    }

    next();
}

module.exports = {
    validateAddProperty,
    validateUpdateProperty,
    validateOwnerPropertyId,
    validateSearchProperty,
    validateGetAllOwnerProperty
}