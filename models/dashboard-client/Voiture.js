const mongoose = require('mongoose');

const VoitureSchema = new mongoose.Schema({
    proprietaire: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Utilisateurs",
        required: true,
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
    specification: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Specifications",
        required: true,
    }
}, { timestamps: true })
VoitureSchema.index({ proprietaire: 2, specification: 2, immatriculation: 2 }, { unique: true });

module.exports = new mongoose.model('Voitures', VoitureSchema);
