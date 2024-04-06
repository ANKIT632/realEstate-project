const {signUp,signIn} = require('../controllers/auth.controller');
const  {validateSignUpData,validateSignInData}=require('../middlewares/auth.middleware.js')

module.exports=(server)=>{

    server.post('/api/v1/auth/signup',validateSignUpData,signUp);
    server.post('/api/v1/auth/signIn',validateSignInData,signIn);
}