const express = require('express');
const app = express();
require('dotenv').config();

const cors = require('cors');
const {connect} = require("mongoose");
const config = require("./config");


// Middleware setup
app.use(cors())
app.use(express.json());


// MongoDB connection
module.exports = connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB connecté"))
    .catch(err => console.log(err));

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
