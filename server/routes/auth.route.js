const authController = require('../controllers/auth.controller');
const  authMiddleware=require('../middlewares/auth.middleware.js')

module.exports=(server)=>{
    
    server.post('/api/v1/auth/signup',authMiddleware.validateSignUpData , authController.signUp);
    
    server.post('/api/v1/auth/signIn',authMiddleware.validateSignInData , authController.signIn);
    
   
}