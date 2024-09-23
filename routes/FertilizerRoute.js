const express = require('express');
const router = express.Router();
const RequestFertilizer = require('../models/FertilizersRequest') 
const FertilizerData = require('../models/FertilizerData');
const Fertilizers = require('../models/Fertilizers' ); // Adjust the path to your model as necessary

// Adjust the path to your model as necessary




//Request Fertilizer
router.post("/requesrFertilizer", async (req, res) => {
    const { warehouseID,fertilizerName, requestDate,wantedDate, quantity, description } = req.body; 

    try {
        const newrequest = new RequestFertilizer({ 
            warehouseID,
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



  router.get("/getallFertilizerRequest", async (req, res) => {
    try {
        const requests = await RequestFertilizer.find().populate('warehouseID', 'district province'); // Assuming warehouseID is a reference to Warehouse
        return res.json(requests);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});


router.post("/getFertilizerRequestedWarehouseId", async (req, res) => {
    const { warehouseid } = req.body;
    try {
        const request = await RequestFertilizer.find({ warehouseID: warehouseid });
        res.json(request);
    } catch (error) {
        res.status(400).json({ error: error.message });
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


//add Fertilizer fore ware house
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

  //get all fertilizers for ware house
  router.get("/getallFertilizers", async (req, res) => {
    try {
      const requests = await Fertilizers.find();
      return res.json(requests);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  });

  router.post("/getFertilizerRelaventWarehouseId", async (req, res) => {
    const { warehouseid } = req.body;
    try {
        const request = await Fertilizers.find({ warehouseID: warehouseid });
        res.json(request);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

   //getfertilizer for update ware house
   router.route("/getFertilizer/:id").post(async (req, res) => {
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

  
  


//update fertilizer for ware house
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

    //delete fertilizer for warehouse
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



router.route('/addfertilizer').post(async (req, res) => {
    const { imageUrl, name, soilType, fertilizerAmount, waterRequirements, crops, description } = req.body;

    const newFertilizer = new FertilizerData({
        imageUrl,
        name,
        soilType,
        fertilizerAmount,
        waterRequirements,
        crops,
        description
    });

    try {
        await newFertilizer.save();
        return res.status(201).json({ status: "success", message: "Fertilizer details added successfully" });
    } catch (error) {
        console.error("Error saving fertilizer:", error); // Log error details
        return res.status(500).json({ status: "error", message: error.message });
    }
});


// Route to get all fertilizers
router.route('/getfertilizers').get(async (req, res) => {
    try {
        const fertilizers = await FertilizerData.find();
        return res.status(200).json({ status: "success", message: "Fertilizers fetched successfully", fertilizers });
    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message });
    }
});

// Route to get a single fertilizer by ID
router.route('/getfertilizer/:id').get(async (req, res) => {
    const { id } = req.params;

    try {
        const fertilizer = await FertilizerData.findById(id);
        if (!fertilizer) {
            return res.status(404).json({ status: "error", message: "Fertilizer not found" });
        }
        return res.status(200).json({ status: "success", message: "Fertilizer fetched successfully", fertilizer });
    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message });
    }
});

router.route('/editfertilizer/:id').put(async (req, res) => {
    const { id } = req.params;
    const { imageUrl, name, soilType, fertilizerAmount, waterRequirements, crops, description } = req.body;

    console.log("Received update request:", { id, imageUrl, name, soilType, waterRequirements, fertilizerAmount, crops, description });

    const updatedFertilizer = {
        imageUrl,
        name,
        soilType,
        fertilizerAmount, // Ensure this matches the schema
        waterRequirements,
        crops,
        description
    };

    try {
        const result = await FertilizerData.findByIdAndUpdate(id, updatedFertilizer, { new: true });
        if (!result) {
            return res.status(404).json({ status: "error", message: "Fertilizer not found" });
        }
        return res.status(200).json({ status: "success", message: "Fertilizer updated successfully", result });
    } catch (error) {
        console.error("Error updating fertilizer:", error.message);
        return res.status(500).json({ status: "error", message: error.message });
    }
});

  

// Route to delete a fertilizer by ID
router.delete('/deletefertilizer/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await FertilizerData.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ status: "error", message: "Fertilizer not found" });
        }
        return res.status(200).json({ status: "success", message: "Fertilizer deleted successfully" });
    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message });
    }
});





module.exports = router;