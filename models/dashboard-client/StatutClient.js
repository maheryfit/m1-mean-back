const mongoose = require('mongoose');
const StatutClientSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    anciennete: {
        type: Number,
        required: true,
        validate: {
            validator: (value) => value > 0,
            message: 'Ancienneté ne doit pas être négative ou null'
        }
    },
    depenses: {
        type: Number,
        required: true,
        validate: {
            validator: (value) => value > 0,
            message: 'Dépense ne doit pas être négative ou null'
        }
    },
}, { timestamps: true })

module.exports = mongoose.model('StatutClients', StatutClientSchema);
