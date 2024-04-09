const {signUp,signIn,updateUser} = require('../controllers/auth.controller');
const  {validateSignUpData,validateSignInData,verifyToken}=require('../middlewares/auth.middleware.js')

module.exports=(server)=>{
    
    server.post('/api/v1/auth/signup',validateSignUpData,signUp);
    server.post('/api/v1/auth/signIn',validateSignInData,signIn);
    server.put('/api/v1/auth/update/:id',verifyToken,updateUser);
   
}