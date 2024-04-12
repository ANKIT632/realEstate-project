const { Schema, model } = require('mongoose');
const { defaultUrls } = require('../asset/userprofile.asset.js');

const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  }
  ,
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    },
  },
  age: {
    type: String,
    default: "none"
  },

  gender: {
    type: String,
    default: "none"
  },

  password: {
    type: String,
    required: true,
    minlength: 6
  },
  profile_url: {
    type: String,
    default: function () {
      let getRandomIdx = Math.floor(Math.random() * 10) + 1;
      return defaultUrls[getRandomIdx];
    }

  },
  role: {
    type: String,
    required: true,
    enum: ['Admin', 'Buyer', 'Seller'],
  },
  
  address: {
    type: String,
    default: "none"
  },


  phone: {
    type: String,
    default:"none"
  
  },
  socialUrls: {
    LinkedIn: {
      type: String,
      default: "none"
    },
    Facebook: {
      type: String,
      default: "none"
    },
    Twitter: {
      type: String,
      default: "none"
    },
    Instagram: {
      type: String,
      default: "none"
    },

    }
  


}, { timestamps: true, versionKey: false })


// hash password before save ,note must user update by save
userSchema.pre('save', async function (next) {

  // if modified password then hash it



  if (this.isModified('password')) {
    console.log('update password');
    const salt = await bcrypt.genSalt(6);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});



module.exports = model('User', userSchema);