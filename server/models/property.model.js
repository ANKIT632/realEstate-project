const {imgUrlEx,imgUrlIn}=require('../asset/propertyUrlImg.asset')
const {Schema,model} =require('mongoose');

const propertySchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true
    },
    location: {
      city: {
        type: String,
        // required: true
      },
      region: {
        type: String,
        // required: true
      },
      country: {
        type: String,
        // required: true
      },
      postalCode: {
        type: String,
        // required: true
      },
    },
    price: {
      type: Number,
      required: true
    },

    imagesUrl: {
        type:[String],
        default:function(){
            let arr=[];
                arr.push(imgUrlEx[Math.floor(Math.random()*imgUrlEx.length)]);
            for (let i = 0; i < 3; i++) {
                arr.push(imgUrlIn[Math.floor(Math.random()*imgUrlIn.length)]);
            }
            return arr;
        }
    },

    bedrooms: Number,
    size: Number,

    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    soldBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
    isSold: {
      type: Boolean,
      default: false
    },
    nagotiate:{
      type:Boolean,
      default:false
    }


  },{timestamps:true,versionKey:false});

module.exports=model('Property',propertySchema);