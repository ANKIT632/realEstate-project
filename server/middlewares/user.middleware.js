const mongoose = require('mongoose');



const validateUserUpdate = (req, res, next) => {

  const userId = req.params.userId;
  const role=req.body.role;

  

  
 if (role !== undefined) {
    if (role !== 'buyer' && role !== 'seller') {
      return res.status(400).send({ status: "failed", message: "role not valid" });
    }
    else if(role==='seller' || role==='buyer'){
      req.body.role=req.body.role==='buyer'?'Buyer':'Seller';
    }
  
  }
  if (userId.length !== 24 || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).send({ status: "failed", message: "User id not valid" });
  }

  if (userId !== req.user._id.toString()) {
    return res.status(403).send({ status: "failed", message: "Unauthorized access" });
  }

  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({ status: "failed", message: 'Request body cannot be empty' });
  }

  if(req.body.email){
    return res.status(400).send({ status: "failed", message: 'Email can not be update here' });
  }


 if(req.body.password && Object.keys(req.body).length > 1 ){
    return res.status(400).send({ status: "failed", message: 'only password single field update' });
  }

  next();

}

const validateGetAllUsers = (req, res, next) => {
  const userType = req.query.role;


  if (req.query.role !== undefined) {

    if (userType === 'seller' || userType === 'buyer') {
      req.query.role = userType === 'seller' ? 'Seller' : 'Buyer';
    }
    else if (userType !== 'seller' || userType !== 'buyer') {
      return res.status(400).send({ status: "failed", message: "role not valid" });
    }


  }
  next();


}



module.exports = { validateUserUpdate, validateGetAllUsers };