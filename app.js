const express = require('express');
const app = express();
require('dotenv').config();

const cors = require('cors');
const {connect} = require("mongoose");
const config = require("./config");
const socket = require('socket.io');

// Middleware setup
app.use(cors())
app.use(express.json());

// Router
const userRouter = require('./routes/userRouter')
app.use("/user", userRouter);


// MongoDB connection
module.exports = connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB connecté"))
    .catch(err => console.log(err));

// Server
const server = app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});

// Websocket
const io = socket(server, {
    cors: {
        origin: "*",
    }
});

// Listen for new connection and print a message in console
io.on('connection', (socket) => {
    console.log(`New connection ${socket.id}`);
    socket.on('chat', (data) => {
        data['from'] = "incoming";
        console.log(data);
        io.emit('chat', data);
    })
    socket.on('typing', (data) => {
        console.log(data);
        io.emit('typing', data);
    })
})
