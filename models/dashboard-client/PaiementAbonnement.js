const mongoose = require('mongoose');

const PaiementAbonnementSchema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clients",
        required: true
    },
    montant_paye: {
        type: Number,
        required: true,
        validate: {
            validator: (value) => value > 0,
            message: 'Montant payé ne doit pas être négatif ou null'
        }
    },
    abonnement: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Abonnements",
        required: true,
    },
    date_heure: {
        type: Date,
        required: true,
        default: Date.now()
    }
}, { timestamps: true })

module.exports = new mongoose.model('PaiementAbonnements', PaiementAbonnementSchema);
