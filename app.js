const express = require('express');
const app = express();
require('dotenv').config();

const cors = require('cors');
const {connect} = require("mongoose");
const config = require("./config");
const socket = require('socket.io');
const cookieParser = require("cookie-parser");
// Cookie
app.use(cookieParser());

// Middleware setup
app.use(cors(
    {
        origin: config.ORIGINS,
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    }
))
app.use(express.json());


// MongoDB connection
module.exports = connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB connecté"))
    .catch(err => console.log(err));


// --------------------------------------- ROUTER -------------------------------------------------
// Router
const userRouter = require('./routes/utilisateurRouter')
app.use("/user", userRouter);

// Abonnement router
const abonnementRouter = require('./routes/dashboard-client/abonnementRouter')
app.use("/abonnements", abonnementRouter);

// Specification router
const specificationRouter = require('./routes/dashboard-client/specificationRouter')
app.use("/specifications", specificationRouter);

// StatutClient router
const statutClientRouter = require('./routes/dashboard-client/statutClientRouter')
app.use("/statutClients", statutClientRouter);

// Voiture router
const voitureRouter = require('./routes/dashboard-client/voitureRouter')
app.use("/voitures", voitureRouter);

// Client router
const clientRouter = require('./routes/dashboard-client/clientRouter')
app.use("/clients", clientRouter);

// PaiementAbonnement router
const paiementAbonnementRouter = require('./routes/dashboard-client/paiementAbonnementRouter')
app.use("/paiementAbonnements", paiementAbonnementRouter);

// Mecanicien router
const mecanicienRouter=require("./routes/dashboard-mecanicien/mecanicienRouter");
app.use("/mecanicien", mecanicienRouter);

// --------------------------------------- ROUTER -------------------------------------------------

// Server
const server = app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});

// Websocket
const io = socket(server, {
    cors: {
        origin: config.ORIGINS,
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

module.exports=app;