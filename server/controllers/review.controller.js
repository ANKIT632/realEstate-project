const reviewModel= require("../models/review.model.js");

const createReview=async (req,res)=>{
    
    const {property,rating,about}=req.body;

    try{
   await reviewModel.create({user:req.user._id,property,rating,about});
    res.status(200).send({status:"success"});
    }
    catch(err){
   res.status(500).send({status:"failed",message:err.message});
    }
      
}

const getAllReview=async(req,res)=>{
    try{
    const allReview= await reviewModel.find().populate('user','username profile_url socialUrls createdAt');
    
    res.status(200).send({status:"success",data:allReview});
    }
    catch(err){
        res.status(500).send({status:"failed",message:err.message});
    }
}

module.exports={createReview,getAllReview};