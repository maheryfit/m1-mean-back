const mongoose = require('mongoose');

const ConfirmationPaiementDevisSchema = new mongoose.Schema({
    paiementDevis: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PaiementDevis",
        required: true
    },
    mecanicien: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mecaniciens",
        required: true
    },
    date_heure: {
        type: Date,
        required: true,
        default: Date.now()
    }
}, { timestamps: true })

module.exports = new mongoose.model('ConfirmationPaiementDevis', ConfirmationPaiementDevisSchema);
