const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cropFactorsSchema = new Schema ({

    province: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        required: true,
    },
    soiltype: {
        type: String,
        required: true,
    },
    soilph: {
        type: Number,
        required: true,
    },
    nutrientcontent: {
        type: String,
        required: true,
    },
    temperature: {
        type: String,
        required: true,
    },
    rainfall: {
        type: String,
        required: true,
    },
    humidity: {
        type: String,
        required: true,
    },
    altitude: {
        type: String,
        required: true,
    },
    topography: {
        type: String,
        required: true,
    },
    irrigationsystems: {
        type: String,
        required: true,
    },
    waterquality: {
        type: String,
        required: true,
    },
    varietyselection: {
        type: String,
        required: true,
    },
    growthcycle: {
        type: String,
        required: true,
    },
    pestpressure: {
        type: String,
        required: true,
    },
    diseaseincidence: {
        type: String,
        required: true,
    },
    croprotation: {
        type: String,
        required: true,
    },
    fertilizeruse: {
        type: String,
        required: true,
    },
    demandandpricetrends: {
        type: String,
        required: true,
    },
    supplychainefficiency: {
        type: String,
        required: true,
    },
});

const CropFactors = mongoose.model('cropfactors', cropFactorsSchema);

module.exports = CropFactors;