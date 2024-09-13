const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fertilizerSchema = new Schema({
    imageUrl: {
        type: String,  
        required: true
    },
    name: {
        type: String,
        required: true
    },
    soilType: {
        type: String,
        required: true
    },
    fertilizerAmount: {  // Correct field name
        type: Number,    
        required: true
    },
    waterRequirements: {
        type: String,
        required: true
    },
    crops: [{ 
        type: String,
        required: true
    }],
    description: {
        type: String,
        required: true
    }
});


const FertilizerData = mongoose.model('fertilizerdetails', fertilizerSchema);

module.exports = FertilizerData;
