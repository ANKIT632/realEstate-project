const property_model = require('../models/property.model.js');

exports.createProperty = async (req, res) => {

    // get user

    const user = req.user._id;
    const { title, description, location, price} = req.body;

    //create user

    try {
        const property = await property_model.create({ title, description, location, price, owner: user });

        console.log(property);

        return res.status(200).send({ message: 'Property added successfully for selling' })
    }

    catch (err) {
        return res.status(500).send({ message: "Error occur while add property" })
    }
}

exports.getAllProperty = async (req, res) => {

    try {
        const allProperty =await property_model.find().populate('owner','-password');

        if (!allProperty) {
            return res.status(404).send({ message: "No property found" })
        }

        else {
            return res.status(200).send(allProperty)

        }
    }

    catch (err) {
        return res.status(500).send({ message: "Error occur while fetching property" })
    }


}

exports.updateProperty = async(req,res) => {
   
    try {
                
        const property = await property_model.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!property) {
          return res.status(404).send({ message: 'Property not found' });
        }
        res.status(200).send(property);
      } catch (err) {
        res.status(500).send({ message: 'Error occurred while updating property' });
      }
}