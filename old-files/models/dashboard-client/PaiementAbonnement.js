const mongoose = require('mongoose');
const {AbonnementSchema} = require("./Abonnement");
const PaiementAbonnementSchema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clients",
        required: true
    },
    abonnement: {
        type: AbonnementSchema,
        required: true,
    },
    date_heure: {
        type: Date,
        required: true,
        default: Date.now()
    },
    montant: {
        type:mongoose.Schema.Types.Decimal128,
        required: true,
        validate: {
            validator: (value) => value > 0,
            message: 'Montant ne doit pas être négatif ou null'
        }
    }
}, { timestamps: true })

module.exports = new mongoose.model('PaiementAbonnements', PaiementAbonnementSchema);
