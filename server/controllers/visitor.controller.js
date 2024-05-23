const visitorModel = require("../models/visitor.model.js");

exports.createVisitor = async (req, res) => {
    const propertyId = req.params.propertyId;
    const visitorId = req.user._id;

    try {
        let visit_property = await visitorModel.findOne( {propertyId:propertyId});

  
        if (!visit_property) {
      
            visit_property = new visitorModel({ propertyId: propertyId, visitors: [] });
        }

        let now = new Date();
        console.log(now.getDate());

        const existingVisitor = visit_property.visitors.find(visitor => {
            return new Date(visitor.visitedAt).getDate() === now.getDate();
        });


        const len = visit_property.visitors.length-1;
        if (existingVisitor) {
                now.setDate( new Date(visit_property.visitors[len].visitedAt).getDate() + 1); 
        }
        else{
            now.setDate(now.getDate());
            }

        //  add date and visitorId
        
        const isUserVisited = visit_property.visitors.find(visitor => visitor.visitorDetails.toString() === visitorId.toString());

        if(!isUserVisited){
            visit_property.visitors.push({ visitorDetails:visitorId, visitedAt: now });
            await visit_property.save();
        }

        else{
            return res.status(400).send({ status: "failed", message: "visitor already added" });
        }
        

        res.status(200).send({ status: "success", message: "visitor added successfully "});
    }

    catch (err) {
        res.status(500).send({ status: "failed", message: err.message });
    }
};


exports.getVisitors = async (req, res) => {
    const  propertyId  = req.params.propertyId;
       
    try {    const totalVisitors = await visitorModel.countDocuments();
        let visitors = await visitorModel.findOne( {propertyId:propertyId} ).populate('visitors.visitorDetails','fullName email  phone profile_url');


        res.status(200).send({ status: "success", totalVisitors,visitors });
    } catch (err) {
        res.status(500).send({ status: "failed", message: err.message });
    }
} 