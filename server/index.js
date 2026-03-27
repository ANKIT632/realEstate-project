const express = require('express');
const { db_connection } = require('./dbConnect.js');
const cors = require('cors');
const server_config = require('./configs/server.config.js')
const path = require('path');


// initialize server
const server = express();

require('dotenv').config();

const allowedOrigins = [
    process.env.CLIENT_URL,
    'https://ecostate.vercel.app',
    'http://localhost:5173',
    'http://127.0.0.1:5173'
].filter(Boolean);

//middleware
server.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true
}));
server.use(express.json({limit: '2mb'}));
server.use(express.urlencoded({ extended: true })); 


// Serve static files from the "public" directory
// server.get('/api/v1/doc', (req, res) => {
//     return res.sendFile(path.join(__dirname, 'public', 'api.txt'));
// });


//routers
require('./routes/auth.route.js')(server);
require('./routes/user.route.js')(server);
require('./routes/property.route.js')(server);
require('./routes/review.route.js')(server);
require('./routes/visitor.route.js')(server);

// Handle 404
server.use(function(req, res, next) {
    res.status(404).json({status:false, message: 'Not Found Url path' });
  });
  




// connect server and database
db_connection().then(() => { 

    // console.log('Connected to database');
    server.listen(server_config.PORT, (err) => {
        if (err) {
            // console.log(err);
        }
        // console.log(`Server is running on port ${server_config.PORT}`);
    });
});




 
