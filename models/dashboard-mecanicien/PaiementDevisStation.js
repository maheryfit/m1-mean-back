const mongoose = require('mongoose');

const PaiementSchema = new mongoose.Schema({
    montant : {
        type:mongoose.Schema.Types.Decimal128,
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
}, {timestamps: true});

const PaiementDevisStationSchema = new mongoose.Schema({
    station: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Stations",
        required: true,
        unique: true
    },
    paiements: [
        {
            type: PaiementSchema,
            required: true,
        }
    ],

}, { timestamps: true })

module.exports = new mongoose.model('PaiementDevisStations', PaiementDevisStationSchema);
