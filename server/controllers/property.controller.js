const property_model = require('../models/property.model.js');



// create property  or register property
exports.createProperty = async (req, res) => {

    const user = req.user._id;
    req.body.owner = user;
    const propertyData = req.body;


    try {
        await property_model.create(propertyData);

        return res.status(200).send({ status: "success", message: 'Property added successfully for selling' })
    }

    catch (err) {

        return res.status(500).send({ status: "failed", message: err.message })
    }
}


// get all property
exports.getAllProperty = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 20;


    try {
        const totalProperty = await property_model.countDocuments();
        const allProperty = await property_model.find().sort({ createdAt: -1 }).skip((page - 1) * size).populate('owner', 'username  email profile_url socialUrls').limit(size);

        return res.status(200).send({ status: "success", totalProperty, allProperty })

    }

    catch (err) {

        return res.status(500).send({ status: "failed", message: err.message })
    }


}


// update property
exports.updateProperty = async (req, res) => {

    try {
        const property = await property_model.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!property) {
            return res.status(404).send({ status: "failed", message: 'Property not found' });
        }
        res.status(200).send({ status: "success", message: 'Property updated successfully' });

    } catch (err) {

        res.status(500).send({ status: "failed", message: err.message });
    }
}

// getSearch data

exports.searchProperty = async (req, res) => {
    const searchQuery = req.query.searchQuery;
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 10;

    try {
        const totalProperty = await property_model.countDocuments({ $text: { $search: searchQuery } })
        const allProperty = await property_model.search(searchQuery, page, size).sort({ createdAt: -1 });

        res.status(200).send({ status: "success", totalProperty, allProperty });
    } catch (err) {

        res.status(500).send({ status: "failed", message: err.message });
    }
}


// get All property by owner
exports.getAllPropertyByOwner = async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 20;

    try {
        const totalProperty = await property_model.countDocuments({ owner: req.user._id });
        const allProperty = await property_model.find({ owner: req.user._id }).sort({ createdAt: -1 }).skip((page - 1) * size);

        return res.status(200).send({ status: "success", totalProperty, allProperty });
    }

    catch (err) {
        return res.status(500).send({ status: "failed", message: err.message });
    }

}