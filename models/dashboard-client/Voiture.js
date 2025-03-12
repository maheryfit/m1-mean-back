const mongoose = require('mongoose');

const VoitureSchema = new mongoose.Schema({
    proprietaire: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Utilisateurs",
        required: true,
        unique: true
    },
    description: {
        type: Text,
        required: true,
    },
    immatriculation: {
        type: String,
        unique: true,
        required: true,
    },
    specifications: {
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

module.exports = new mongoose.model('Voitures', VoitureSchema);
