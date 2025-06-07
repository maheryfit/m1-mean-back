const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    utilisateur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Utilisateurs",
        required: true,
        unique: true
    },
    date_inscription: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    telephone: {
        type: String,
        unique: true,
        required: true,
    },
    abonnement: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Abonnements",
        required: false,
    },
    statut_client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "StatutClients",
        required: false,
    }
}, { timestamps: true })

module.exports = new mongoose.model('Clients', ClientSchema);
