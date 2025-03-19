const express = require('express');
const app = express();
require('dotenv').config();

const cors = require('cors');
const config = require("./config");
const socket = require('socket.io');
const cookieParser = require("cookie-parser");
const pathFolder = require("path");

// Cookie
app.use(cookieParser());

// Setup public link to the picture
app.use("/images", express.static(pathFolder.join(__dirname, 'uploads')));

// Middleware setup
app.use(cors(
    {
        origin: config.ORIGINS,
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    }
))
app.use(express.json());

// Middleware to handle URL-encoded bodies (if needed)
app.use(express.urlencoded({ extended: true }));

// Service connection
require('./utils/serviceTierceUtil')


// --------------------------------------- ROUTER -------------------------------------------------
// Router
const userRouter = require('./routes/utilisateurRouter')
app.use("/user", userRouter);

// Message
const messageRouter = require('./routes/messageRouter')
app.use("/messages", messageRouter);

// --------------------------- Client --------------------------------------
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

// DemandeRDVDiagnostic router
const demandeRDVDiagnosticRouter = require('./routes/dashboard-client/demandeRDVDiagnosticRouter')
app.use("/demandeRDVDiagnostics", demandeRDVDiagnosticRouter);

// --------------------------- Client --------------------------------------

// --------------------------- Mécanicien --------------------------------------
// Mecanicien router
const mecanicienRouter=require("./routes/dashboard-mecanicien/mecanicienRouter");
app.use("/mecanicien", mecanicienRouter);

const stationRouter=require("./routes/dashboard-mecanicien/stationRouter");
app.use("/station", stationRouter);

// --------------------------- Mécanicien --------------------------------------

// --------------------------- Manager --------------------------------------
// Manager router
const managerRouter=require("./routes/dashboard-manager/managerRouter");
const middleware = require("./middlewares/authentificationMiddleware")
app.use("/managers", managerRouter);

// --------------------------- Manager --------------------------------------

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
const path = require("node:path");
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
