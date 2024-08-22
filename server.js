require("dotenv").config(); // Ensure this is at the top
const dotenv = require('dotenv');

const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser"); 
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const dbconfig = require('./db');
const farmersRoute = require('./routes/FarmersRoute');
const employeesRoute = require('./routes/EmplyeesRoute');
const cropRoute = require('./routes/CropRoute');
const fertilizerRoute = require('./routes/FertilizerRoute');
const warehouseRoute = require('./routes/WareHouseRoute');
const appoinmentRoute = require('./routes/AppointmentRoute');

app.use('/api/farmers', farmersRoute);
app.use('/api/employees', employeesRoute);
app.use('/api/crops', cropRoute);
app.use('/api/fertilizers', fertilizerRoute);
app.use('/api/warehouses', warehouseRoute);
app.use('/api/appoinments', appoinmentRoute);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
