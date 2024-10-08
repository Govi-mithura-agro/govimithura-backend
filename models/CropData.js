const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cropSchema = new Schema ({

    crop: [{
        type: String,
        required: true,
    }],
    cropName: {
        type: String,
        required: true,
    },
    scientificName: {
        type: String,
        required: true,
    },
    plantingSeason: {
        type: String,
        required: true,
    },
    soilType: {
        type: String,
        required: true,
    },
    growthDuration: {
        type: Number,
        required: true,
    },
    averageYield: {
        type: Number,
        required: true,
    },
    waterRequirements: {
        type: String,
        required: true,
    },
    region: [{
        type: String,
        required: true,
    }],
    description: {
        type: String,
        required: true,
    }
});

const CropData = mongoose.model('cropdetails', cropSchema);

module.exports = CropData;