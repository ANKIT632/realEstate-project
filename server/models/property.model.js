const { imgUrlEx, imgUrlIn } = require('../asset/propertyUrlImg.asset')
const { Schema, model } = require('mongoose');

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
      default: 'none',
      required: true
    },
    region: {
      type: String,
      default: 'none'
       
    },
    country: {
      type: String,
      default: 'none',
      required: true
    },
    postalCode: {
      type: String,
      default: 'none'

    },
  },
  price: {
    type: Number,
    required: true
  },

  imagesUrl: {
    type: [String],
    default: function () {
      let arr = [];
      arr.push(imgUrlEx[Math.floor(Math.random() * imgUrlEx.length)]);
      for (let i = 0; i < 3; i++) {
        arr.push(imgUrlIn[Math.floor(Math.random() * imgUrlIn.length)]);
      }
      return arr;
    }
  },

  propertyInfo: {
    bedrooms: {
      type: Number,
      default: 1
    },
    bathrooms: {
      type: Number,
      default: 1
    },
    squareFeet: {
      type: Number,
      default: 0
    },
  }
  ,
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
  nagotiate: {
    type: Boolean,
    default: false
  },
  category:{
  type:String,
  required:true,
  }
,
  tags: {
    type: String,
    default: 'none'
  },


}, { timestamps: true, versionKey: false });

propertySchema.index({ 'title': 'text', 'description': 'text', 'location.city': 'text', 'location.region': 'text', 'location.country': 'text', 'tags': 'text' });

propertySchema.statics.search = function (query, page, size) {
  return this.find({ $text: { $search: query } }).skip((page - 1) * size)
    .limit(size).populate('owner', '-password -email -createdAt -updatedAt -gender -address -phone -role -age -socialUrls').select('-createdAt -updatedAt');

}

module.exports = model('Property', propertySchema); 