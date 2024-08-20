require("dotenv").config(); // Ensure this is at the top

const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser"); // Import body-parser

const app = express();

const userRoute = require('./routes/usersRoute.js');

// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
    ],
    methods: ["POST", "GET", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/", userRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
