const property_model = require('../models/property.model.js');



// create property // register property
exports.createProperty = async (req, res) => {

    const user = req.user._id;
    const { title, description, location, price} = req.body;

    try {
        await property_model.create({ title, description, location, price, owner: user });

        return res.status(200).send({ status: "success", message: 'Property added successfully for selling' })
    }

    catch (err) {
        console.log('err', err);
        return res.status(500).send({status: "failed", message: "Error occur while add property" })
    }
}


// get all property
exports.getAllProperty = async (req, res) => {
    const page = parseInt(req.query.page)||1;
    const size = parseInt(req.query.size)||20;


    try {
        const allProperty =await property_model.find().skip((page-1)*size).populate('owner','-password -email -createdAt -updatedAt -gender -address' ).limit(size).select('-createdAt -updatedAt');

        if (!allProperty.length) {
            return res.status(404).send({status: "failed", message: "No more property" })
        }

        else {
            return res.status(200).send({ status: "success",allProperty})

        }
    }

    catch (err) {
        console.log('err', err);
        return res.status(500).send({status: "failed", message: "Error occur while fetching property" })
    }


}


// update property
exports.updateProperty = async(req,res) => {
   
    try {
                
        const property = await property_model.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!property) {
          return res.status(404).send({status: "failed", message: 'Property not found' });
        }
        res.status(200).send({ status:"success",property});
        
      } catch (err) {
        res.status(500).send({status: "failed", message: 'Error occurred while updating property' });
      }
}

// getSearch data

exports.searchProperty = async (req, res) => {
    const searchQuery = req.query.searchQuery;
    const page=parseInt(req.query.page)||1;
   const size=parseInt(req.query.size)||10;

    try {
        const searchProperty = await property_model.search(searchQuery,page,size);
        if (!searchProperty.length) {
            return res.status(404).send({ status: "failed", message: 'No property found' });
        }
        res.status(200).send({ status: "success", searchProperty });
    } catch (err) {
        console.log('err', err);
        res.status(500).send({ status: "failed", message: 'Error occurred while searching property' });
    }
}