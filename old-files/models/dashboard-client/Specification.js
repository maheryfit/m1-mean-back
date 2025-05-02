const mongoose = require('mongoose');

const config = require("../../config");

const SpecificationSchema = new mongoose.Schema({
    modele: {
        type: String,
        required: true,
        index: true,
    },
    type: {
        type: String,
        required: true,
        index: true,
    },
    moteur: {
        type: String,
        required: true,
        index: true,
        enum: config.MOTEUR,
    },
    transmission: {
        type: String,
        required: true,
        index: true,
        enum: config.TRANSMISSION,
    },
    traction: {
        type: String,
        required: true,
        index: true,
        enum: config.TRACTION,
    },
}, { timestamps: true })

SpecificationSchema.index({ modele: 1, type: 1, moteur: 1, transmission: 1, traction: 1 }, { unique: true });

module.exports = mongoose.model('Specifications', SpecificationSchema);
