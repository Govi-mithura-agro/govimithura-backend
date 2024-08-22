const express = require('express');
const router = express.Router();
const CropData = require('../models/CropData');

router.route('/addcropdata').post(async(req, res) => {

    const {
        crop,
        cropName,
        scientificName,
        plantingSeason,
        soilType,
        growthDuration,
        averageYield,
        waterRequirements,
        region
    } = req.body;

    const newCropData = new CropData({
        crop,
        cropName,
        scientificName,
        plantingSeason,
        soilType,
        growthDuration,
        averageYield,
        waterRequirements,
        region
    });
 
    try {
        await newCropData.save();
        return res.status(200).json({status: "Crop details are added successfully"});
    } catch (error) {
        return res.status(500).json({status: "Error with adding crop details", message: error.message});
    }  

});

module.exports = router;
