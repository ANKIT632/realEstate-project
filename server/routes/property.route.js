const {createProperty,updateProperty,getAllProperty} =require('../controllers/property.controller.js');
const {validateAddProperty,validateUpdateProperty,validateGetAllProperty} =require('../middlewares/propery.middleware.js');
const {verifyToken} =require('../middlewares/auth.middleware.js');


module.exports=(server)=>{
  
    server.post('/api/v1/selling/property',verifyToken,validateAddProperty,createProperty);
    server.get('/api/v1/selling/property',validateGetAllProperty,getAllProperty);
    server.put('/api/v1/selling/property/:id',verifyToken,validateUpdateProperty,updateProperty);

}
