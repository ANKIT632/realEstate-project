const controller = require('../controllers/visitor.controller.js');
const middleware=require('../middlewares/auth.middleware.js')

module.exports=(server)=>{
    server.post('/api/v1/property/visitor/:propertyId',middleware.verifyToken,controller.createVisitor);

    server.get('/api/v1/property/visitors/:propertyId',controller.getVisitors);
}