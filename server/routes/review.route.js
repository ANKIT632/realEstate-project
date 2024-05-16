const {createReview,getAllReview} =require('../controllers/review.controller.js');
const validateUserReview= require('../middlewares/review.middleware.js');
const authMiddleware =require('../middlewares/auth.middleware.js');

module.exports=(server)=>{
    
    server.get('/api/v1/property/review/all',getAllReview);
    server.post('/api/v1/property/review/create',authMiddleware.verifyToken,validateUserReview,createReview);

}

