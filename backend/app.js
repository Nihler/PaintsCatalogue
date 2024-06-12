const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const paintRoutes = require("./routes/paints");

const app = express();

//connection string
mongoose
  .connect(
    "mongodb+srv://admin:" +
      process.env.MONGO_ATLAS_PW +
      "@cluster0.6u7mujz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.error(err);
  });

//parsing request to json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//fixing CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/paint", paintRoutes);

module.exports = app;
