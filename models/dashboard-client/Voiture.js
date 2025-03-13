const mongoose = require('mongoose');

const VoitureSchema = new mongoose.Schema({
    proprietaire: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Utilisateurs",
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    immatriculation: {
        type: String,
        unique: true,
        required: true,
    },
    specifications: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Specifications",
        required: true,
    }
}, { timestamps: true })

module.exports = new mongoose.model('Voitures', VoitureSchema);
