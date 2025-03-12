const mongoose = require('mongoose');

const AbonnementSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    prix: {
        type: Number,
        required: true,
        validate: {
            validator: (value) => value > 0,
            message: 'Prix ne doit pas être négatif ou null'
        }
    },
    pourcentage_reduction: {
        type: Number,
        required: true,
        validate: {
            validator: (value) => value >= 0,
            message: 'Pourcentage reduction ne doit pas être négatif'
        }
    }
}, { timestamps: true })

module.exports = new mongoose.model("Abonnements", AbonnementSchema);
