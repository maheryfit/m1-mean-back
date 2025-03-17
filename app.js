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


// Service connection
require('./utils/serviceTierceUtil')


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

// Singleton
const SocketPairUtilisateur = new require("./utils/objectSingletonUtil")
const socketPairUtilisateur = new SocketPairUtilisateur()
// Listen for new connection and print a message in console
io.on('connection', (socket) => {
    socket.on('chat', (data) => {
        io.emit('chat', data);
    })

    socket.on('online', async (data) => {
        const socketId = socket.id;
        const utilisateurId = data.id
        // Ajouter la clé valeur dans l'utilisateur
        await socketPairUtilisateur.storeSocketIdAndUtilisateurId(socketId, utilisateurId);
        io.emit('online', data);
    })

    socket.on('offline', async (data) => {
        const socketId = socket.id;
        // Supprimer la clé valeur dans l'utilisateur
        await socketPairUtilisateur.invalidateSocketId(socketId);
        io.emit('offline', data);
    })

    socket.on('typing', async (data) => {
        const utilisateurDestinataireId = data.id
        const socketIds = await socketPairUtilisateur.getSocketIdsByUtilisateur(utilisateurDestinataireId)
        socketIds.forEach(socketId => {
            io.to(socketId).emit('typing', data);
        })
    })
})

module.exports=app;