const property_model = require('../models/property.model.js');

const validateAddProperty = (req, res, next) => {

    const { title, description, location, price } = req.body;
    if(req.user.role!=='Seller'){
         return res.status(403).send({ message: 'Only seller are valid for this request !!' });
    }
    if (!title || !description || !location || !price) {
        return res.status(400).send({ message: 'All required field are necessary !!' });
    }
    next();
}

const validateUpdateProperty = async (req, res, next) => {

    try {

       
        if (req.body.length === 0) {
            {
                return res.status(400).send({ message: 'Not update found !!' });
            }
        }

      

        const ownerId = await property_model.findById(req.params.id).select('owner');
       
        
        if(!ownerId){
            return res.status(404).send({ message: 'Property not found check Id' });
        }
     
        if (req.user._id.toString() !== ownerId.owner.toString()) {
            return res.status(403).send({ message: "You are not valid User to update this property" });

        }

        next();
    }

    catch (err) {
        return res.status(500).send({ message: "Error occur while validate update property check the Id !" });
    }


}

module.exports = {
    validateAddProperty,
    validateUpdateProperty,
}