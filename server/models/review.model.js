const {Schema,model} =require("mongoose");


const reviewSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    property:{
        type:Schema.Types.ObjectId,
        ref:"Property",
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    about:{
        type:String,
        required:true
    }
},{timestamps:true});


module.exports= model("Review",reviewSchema);

