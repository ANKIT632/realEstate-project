const express=require('express');
const {db_connection}=require('./dbConnect.js');
const cors=require('cors');
const server_config=require('./configs/server.config.js')


// initialize server
const server=express();

require('dotenv').config();

//middleware
server.use(cors({credentials: true, origin: true})); 
server.use(express.json());


//routers
require('./routes/auth.route.js')(server);
require('./routes/user.route.js')(server);
require('./routes/property.route.js')(server);








// connect server and database
db_connection().then(()=>{
    console.log('Connected to database');
    server.listen(server_config.PORT,(err)=>{
        if(err){
            console.log(err);
        }
        console.log(`Server is running on port ${server_config.PORT}`);
    });
});





