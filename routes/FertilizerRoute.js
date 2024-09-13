const express = require('express');
const router = express.Router();
const RequestFertilizer = require('../models/FertilizersRequest') 
const Fertilizers = require('../models/Fertilizers')


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


//add Fertilizer
router.post("/addFertilizer", async (req, res) => {
    const { warehouseID, fertilizerName,quantity,date} = req.body; 

    try {
        const newFertilizer = new Fertilizers({ 
            warehouseID,
            fertilizerName,
            quantity,
            date,
            
        });

        const request = await newFertilizer.save(); 

        res.send("Warehouse added Successfully!");
    } catch (error) {
        return res.status(400).json({ error });
    }
});


  //getfertilizer
  router.route("/getfertilizer/:id").post(async (req, res) => {
    const fertilizerid = req.params.id;
  
    try {
      const fertilizer = await Fertilizers.findById(fertilizerid);
      return res.status(200).json({ status: "Fertilizer is fatched", fertilizer });
    } catch (error) {
      return res
        .status(400)
        .json({ status: "Error with fatch Fertilizer", message: error });
    }
  });

 //update fertilizer
 router.route("/updatefertilizer/:id").put(async (req, res) => {
    const fertilizerid = req.params.id;
  
    const { fertilizerName,quantity,date } = req.body; 
  
    const updatefertilizer = {
      
            fertilizerName,
            quantity,
            date,
    };
  
    try {
      await Fertilizers.findByIdAndUpdate(fertilizerid, updatefertilizer);
      return res.status(200).json({ status: "Fertilizer updated" });
    } catch (error) {
      return res
        .status(400)
        .json({ status: "Error with update Fertilizer", message: error.message });
    }
  });


    //delete fertilizer
router.route("/delete/:id").delete(async (req, res) => {
    const fertilizerid = req.params.id;
  
    try {
      await Fertilizers.findByIdAndDelete(fertilizerid);
      return res.status(200).json({ status: "fertilizer deleted" });
    } catch (error) {
      return res
        .status(400)
        .json({ status: "Error with delete Fertilizer", massage: error });
    }
  });

  //get all fertilizers
router.get("/getallFertilizers", async (req, res) => {
  try {
    const requests = await Fertilizers.find();
    return res.json(requests);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});


module.exports = router;
