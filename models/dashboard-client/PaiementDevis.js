const mongoose = require('mongoose');
const {DevisSchema} = require("../dashboard-mecanicien/Devis");
const {ClientSchema} = require("./Client");

const PaiementDevisSchema = new mongoose.Schema({
    client: {
        type: ClientSchema,
        required: true
    },
    devis: {
        type: DevisSchema,
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
    }
}, { timestamps: true })

module.exports = new mongoose.model('PaiementDevis', PaiementDevisSchema);
