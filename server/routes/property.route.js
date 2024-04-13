const propertyController =require('../controllers/property.controller.js');
const  propertyMiddleware =require('../middlewares/propery.middleware.js');
const authMiddleware =require('../middlewares/auth.middleware.js');


module.exports=(server)=>{
  
    
    server.get('/api/v1/selling/property/all' , propertyController.getAllProperty);

    
    server.get('/api/v1/selling/property/search', propertyMiddleware.validateSearchProperty , propertyController.searchProperty);

    server.get('/api/v1/owner/selling/properties',authMiddleware.verifyToken , propertyMiddleware.validateGetAllOwnerProperty , propertyController.getAllPropertyByOwner);

    server.post('/api/v1/owner/selling/property' , authMiddleware.verifyToken , propertyMiddleware.validateAddProperty ,propertyController.createProperty);

    
    server.put('/api/v1/selling/property/update/:id',authMiddleware.verifyToken , propertyMiddleware.validateUpdateProperty , propertyController.updateProperty);

}
