const {Schema,model}=require('mongoose');
const {defaultUrls}=require('../asset/userprofile.asset.js');



const userSchema=new Schema({
  username:{
    type:String,
    required:true,
  }
  ,
    email:{
        type:String,
        required:true,
        unique:true
    },
    age:{
        type:Number,
        min:18,
        max:100
    },
  password:{
    type:String,
    required:true,
  },
  profile_url:{
    type :String,
    default: function(){
        let getRandomIdx= Math.floor(Math.random() * 10) + 1;
        return defaultUrls[getRandomIdx];
    }

  },
  role:{
    type:String,
    default:'Buyer',
    enum:[Admin,Buyer,Seller],
  
  },
  address:{
    type:String,
    default:'--add address--'
  },
  gender:{
    type:String,
    default:'-add gender-'}
    ,
    phone:{
        type:Number,
        default:'xxx-xxx-xxxx'
    }


})


userSchema.pre('save', async function(next) {
    // if modified password then hash it
    const salt=await bcrypt.genSalt(6);
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, salt);
    }
    next();
  });



module.exports=model('User',userSchema);