const {updateUser,getAllUser,getSingleUser} = require('../controllers/user.controller');
const  {verifyToken}=require('../middlewares/auth.middleware.js')
const  {validateUser,validateGetAllUsers}=require('../middlewares/user.middleware.js')

module.exports=(server)=>{

    //'http://localhost:3000/api/v1/users?page=1&size=10&userType=Buyer'
    server.get('/api/v1/users',validateGetAllUsers,getAllUser);

    server.get('/api/v1/user/profile/:userId',getSingleUser);

    server.put('/api/v1/user/:userId',verifyToken,validateUser,updateUser);

// rest
//    server.delte('/api/v1/user/:userId',verifyToken,validateUser,deleteUser);
  

}