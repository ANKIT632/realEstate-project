require('dotenv').config();
module.exports={
    db_url:process.env.MONGO_URI||'mongodb://localhost:27017/real-estate',
}