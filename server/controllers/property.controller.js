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
    const category = req.query.category;

    try {
        // Build filter object
        const filter = {};
        if (category && category.trim() !== 'All') {
            filter.category = category;
        }

        const totalProperty = await property_model.countDocuments(filter);
        const allProperty = await property_model
            .find(filter)
            .sort({ createdAt: -1 })
            .skip((page - 1) * size)
            .populate('owner', 'username email profile_url socialUrls')
            .limit(size);

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
    const category = req.query.category;

    try {
        // Build filter object
        const filter = { $text: { $search: searchQuery } };
        if (category && category.trim() !== 'All') {
            filter.category = category;
        }

        const totalProperty = await property_model.countDocuments(filter);
        const allProperty = await property_model
            .find(filter)
            .sort({ createdAt: -1 })
            .skip((page - 1) * size)
            .populate('owner', 'username email profile_url socialUrls')
            .limit(size);

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
        const soldProperty = await property_model.countDocuments({ owner: req.user._id, isSold: true });
        const allProperty = await property_model.find({ owner: req.user._id }).sort({ createdAt: -1 }).skip((page - 1) * size).limit(size);

        return res.status(200).send({
            status: "success",
            totalProperty,
            soldProperty,
            activeProperty: Math.max(0, totalProperty - soldProperty),
            allProperty
        });
    }

    catch (err) {
        return res.status(500).send({ status: "failed", message: err.message });
    }

}

exports.markPropertyAsSold = async (req, res) => {
    try {
        if (req.property?.isSold) {
            return res.status(400).send({ status: "failed", message: 'Property already marked as sold' });
        }

        const property = await property_model.findByIdAndUpdate(
            req.params.id,
            { isSold: true, soldBy: req.user._id },
            { new: true }
        );

        if (!property) {
            return res.status(404).send({ status: "failed", message: 'Property not found' });
        }

        return res.status(200).send({ status: "success", message: 'Property marked as sold', property });
    }
    catch (err) {
        return res.status(500).send({ status: "failed", message: err.message });
    }
};