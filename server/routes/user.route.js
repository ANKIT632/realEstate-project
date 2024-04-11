const userController = require('../controllers/user.controller');
const  authMiddleware=require('../middlewares/auth.middleware.js')
const  userMiddleware=require('../middlewares/user.middleware.js')

module.exports=(server)=>{

    //'http://localhost:3000/api/v1/users?page=1&size=10&userType=Buyer'
    
    server.get('/api/v1/users',userMiddleware.validateGetAllUsers , userController.getAllUser);

    server.get('/api/v1/user/profile/:userId' , userController.getSingleUser);

    server.put('/api/v1/user/profile/:userId',authMiddleware.verifyToken , userMiddleware.validateUser , userController.updateUser);

// rest
//    server.delte('/api/v1/user/:userId',verifyToken,validateUser,deleteUser);
  

}