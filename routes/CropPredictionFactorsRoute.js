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

router.route('/getcropfactors').post(async(req, res) => {

    try {
        
        const cropfactors = await CropFactors.find();

        if (!cropfactors) {
            return res.status(404).json({ status: "Crops factors not found" });
        }

        return res.status(200).json({status: "Crops factors are fatched", cropfactors});

    } catch (error) {
        
        return res.status(500).json({status: "Error with fetch crops factors", message: error});

    }
});

router.route('/getcropfactors/:id').post(async(req, res) => {

    const cropFactorID = req.params.id;

    try {
        
        const cropfactor = await CropFactors.findById(cropFactorID);

        if (!cropfactor) {
            return res.status(404).json({ status: "Crop factor not found" });
        }

        return res.status(200).json({status: "Crop factor is fatched", cropfactor});

    } catch (error) {
        
        return res.status(500).json({status: "Error with fetch crop factor", message: error});

    }
});

router.route('/getcropdata/:id').post(async(req, res) => {

    const cropID = req.params.id;

    try {
        
        const crop = await CropFactors.findById(cropID);

        if (!crop) {
            return res.status(404).json({ status: "Crop not found" });
        }

        return res.status(200).json({status: "Crop is fatched", crop});

    } catch (error) {
        
        return res.status(500).json({status: "Error with fetch Crop", message: error});

    }
});

router.route('/editcropfactor/:id').put(async (req, res) =>{

    const cropFactorID = req.params.id;

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

    const editcropfactor = {
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
    }
    
    try {
        
        await CropFactors.findByIdAndUpdate(cropFactorID , editcropfactor);
        return res.status(200).json({status: "Crop factor updated"});

    } catch (error) {
        
        return res.status(500).json({status: "Error with update crop factor", message: error});

    }
});

router.route('/deletecropfactor/:id').delete(async (req, res) => {

    const cropfactorId = req.params.id;

    try {
        
        await CropFactors.findByIdAndDelete(cropfactorId);
        return res.status(200).json({status : "Crop factor is deleted"});

    } catch (error) {
        
        return res.status(400).json({status : "Error with delete crop factor", message : error});

    }
});


module.exports = router;