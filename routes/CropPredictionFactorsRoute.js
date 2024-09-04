const express = require('express');
const router = express.Router();
const CropFactors = require('../models/PredictionFactors');

router.route('/addcropfactors').post(async(req, res) => {

    const {
        province,
        district,
        soiltype,
        soilph,
        nutrientcontent,
        temperature,
        rainfall,
        humidity,
        altitude,
        topography,
        irrigationsystems,
        waterquality,
        varietyselection,
        growthcycle,
        pestpressure,
        diseaseincidence,
        croprotation,
        fertilizeruse,
        demandandpricetrends,
        supplychainefficiency
    } = req.body;

    const newCropFactor = new CropFactors({
        province,
        district,
        soiltype,
        soilph,
        nutrientcontent,
        temperature,
        rainfall,
        humidity,
        altitude,
        topography,
        irrigationsystems,
        waterquality,
        varietyselection,
        growthcycle,
        pestpressure,
        diseaseincidence,
        croprotation,
        fertilizeruse,
        demandandpricetrends,
        supplychainefficiency
    });
 
    try {
        await newCropFactor.save();
        return res.status(200).json({status: "Crop factors are added successfully"});
    } catch (error) {
        return res.status(500).json({status: "Error with adding crop factors", message: error.message});
    }  

});

module.exports = router;