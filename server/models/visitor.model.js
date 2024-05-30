const { model, Schema } = require('mongoose');

const visitorSchema = new Schema({

    propertyDetails: {
        type: Schema.Types.ObjectId,
        ref: 'Property',
    },
    visitors: [{
        visitorDetails: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        visitedAt: {
            type: Date,
           
        },
    }],

}
    , { timestamps: false, versionKey: false });


module.exports = model('Visitor', visitorSchema);