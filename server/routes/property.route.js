const propertyController =require('../controllers/property.controller.js');
const  propertyMiddleware =require('../middlewares/propery.middleware.js');
const authMiddleware =require('../middlewares/auth.middleware.js');


module.exports=(server)=>{
  
    
    server.get('/api/v1/selling/property' , propertyController.getAllProperty);

    server.get('/api/v1/selling/property/search', propertyMiddleware.validateSearchProperty , propertyController.searchProperty);

    server.post('/api/v1/selling/property' , authMiddleware.verifyToken , propertyMiddleware.validateAddProperty ,propertyController.createProperty);

    
    server.put('/api/v1/selling/property/:id',authMiddleware.verifyToken , propertyMiddleware.validateUpdateProperty , propertyController.updateProperty);

}
