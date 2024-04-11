const mongoose=require('mongoose');



const validateUser=(req,res,next)=>{
   
    const userId=req.params.userId;



    if(userId.length!==24 || !mongoose.Types.ObjectId.isValid(userId)){
        return res.status(400).send({status:"failed", message:"User id not valid"});
    }

    if (userId !== req.user._id.toString()) {
    return res.status(403).send({status:"failed", message:"Unauthorized access"});
  }
    
 next();
    
}

const validateGetAllUsers=(req,res,next)=>{
const userType = req.query.userType;
  const page = req.query.page;
  const size = req.query.size;

  console.log('query :', req.query);

    if (isNaN(page) || page < 1 ||size<1 || isNaN(size)) {
        return res.status(400).send({status: "failed", message:"Page Or Size must be a number and greater than 0"});
      }
    
    if(userType!=='buyer' && userType!=='seller'){
          
        return res.status(400).send({status: "failed",message:"Not valid user !!"})
    }
  
    next();
}



module.exports={validateUser,validateGetAllUsers};