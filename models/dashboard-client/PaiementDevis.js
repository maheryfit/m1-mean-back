const mongoose = require('mongoose');
const etatConfig = require("../../config/etats");
const config = require("../../config");

const PaiementDevisSchema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clients",
        required: true
    },
    devis: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Devis",
        required: true,
    },
    montant: {
        type:mongoose.Schema.Types.Decimal128,
        required: true,
        validate: {
            validator: (value) => value > 0,
            message: 'Montant ne doit pas être négatif ou null'
        }
    },
    date_heure: {
        type: Date,
        required: true,
        default: Date.now()
    },
    etat: {
        type: String,
        required: true,
        enum: etatConfig.ETAT_PAIEMENT_DEVIS,
        default: etatConfig.DEFAULT_ETAT_PAIEMENT_DEVIS
    },
    mode_paiement: {
        type: String,
        required: true,
        enum: config.MODES_PAIEMENT,
        default: config.DEFAULT_MODE_PAIEMENT
    },
    date_heure_validation: {
        type: Date,
    }
}, { timestamps: true })

module.exports = new mongoose.model('PaiementDevis', PaiementDevisSchema);
