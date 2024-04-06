const user_model = require('../models/user.model.js');


const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

const validateSignUpData=async (req,res,next)=>{
 const {username,email,password}=req.body;



 if(!username || !email || !password){
     return res.status(400).send({message:'username,email and password are required'});
 }

 if(password.length<6){
        return res.status(400).send({message:'password must be atleast 6 characters'});
  }
 
 
  if (!emailRegex.test(email)) {

    return res.status(400).send({ message: 'Invalid email address.' });
  }

  try{
    if( await user_model.findOne({email})){
      return res.status(400).send({message:'Email already exists ,please login'});
    }
  }
  catch(err){
   return res.status(500).send({message:"server error"});
  }
  next();

}

const validateSignInData=async(req,res,next)=>{
  const {email,password}=req.body;

  if(!password || !email){
    return res.status(400).send({message:'please Enter your Email and password'});
  }

  if (!emailRegex.test(email)) {

    return res.status(400).send({ message: 'Invalid email address.' });
  }


  if(! await user_model.find({email})){
     return res.status(404).send({message:'Email does not exist,please sign up'});
  }

  
  next();
}

module.exports={
  validateSignUpData,
validateSignInData};