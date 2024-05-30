const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware.js');
const userMiddleware = require('../middlewares/user.middleware.js');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

module.exports = (server) => {

   
    // users
    server.get('/api/v1/users', userMiddleware.validateGetAllUsers, userController.getAllUser);

    // profile
    server.get('/api/v1/user/profile/:userId', userController.getSingleUser);

    // update user
    server.put('/api/v1/user/profile/update', authMiddleware.verifyToken, upload.single('profileImg'),userMiddleware.validateUserUpdate, userController.updateUser);

    // delete account
    server.delete('/api/v1/user/delete',authMiddleware.verifyToken, userController.deleteUser);


}