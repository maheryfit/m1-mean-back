const mongoose = require('mongoose');

const ManagerSchema = new mongoose.Schema({
    utilisateur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Utilisateurs",
        required: true,
        unique: true
    },
    telephone: {
        type: String,
        unique: true,
        required: true,
    }
}, { timestamps: true })

module.exports = new mongoose.model('Managers', ManagerSchema);
