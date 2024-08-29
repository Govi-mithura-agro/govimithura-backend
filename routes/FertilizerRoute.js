const express = require('express');
const router = express.Router();
const RequestFertilizer = require('../models/FertilizersRequest') 


//Request Fertilizer
router.post("/requesrFertilizer", async (req, res) => {
    const { fertilizerName, requestDate,wantedDate, quantity, description } = req.body; 

    try {
        const newrequest = new RequestFertilizer({ 
            fertilizerName,
            requestDate,
            wantedDate,
            quantity, 
            description,
        });

        const request = await newrequest.save(); 

        res.send("Requested Successfully!");
    } catch (error) {
        return res.status(400).json({ error });
    }
});


//get all leaves
router.get("/getallFertilizerRequest", async (req, res) => {
    try {
      const requests = await RequestFertilizer.find();
      return res.json(requests);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  });
  


//get all fertilizerRequest
router.get("/getallFertilizerRequest",async(req,res)=>{

    try {
        const fertilizerRequest = await RequestFertilizer.find()
        return res.json(fertilizerRequest);
    } catch (error) {
        return res.status(400).json({massage : error})
    }
});


//approve leaves
router.post("/approveFertilizerRequest", async (req, res) => {
    const { requestid } = req.body;

    try {
        const fertilizerRequest = await RequestFertilizer.findOne({ _id: requestid });
        if (!fertilizerRequest) {
            return res.status(404).json({ error: "Request not found" });
        }

        fertilizerRequest.status = 'Approved';
        await fertilizerRequest.save();

        res.send("Fertilizer request approved successfully");

    } catch (error) {
        return res.status(400).json({ error });
    }
});

//disapprove leaves
router.post("/disapproveFertilizerRequest", async (req, res) => {
    const { requestid } = req.body;

    try {
        const fertilizerRequest = await RequestFertilizer.findOne({ _id: requestid });
        if (!fertilizerRequest) {
            return res.status(404).json({ error: "Request not found" });
        }

        fertilizerRequest.status = 'Disapproved';
        await fertilizerRequest.save();

        res.send("Fertilizer request disapproved successfully");

    } catch (error) {
        return res.status(400).json({ error });
    }
});






module.exports = router;
