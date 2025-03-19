const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    destinataire: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Utilisateurs",
        required: true
    },
    contenu: {
        type: String,
        required: true
    },
    date_heure_contenu: {
        type: Date,
        required: true
    }
}, {timestamps: true});

const MessageSchema = new mongoose.Schema({
    utilisateur_1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Utilisateurs",
        required: true
    },
    utilisateur_2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Utilisateurs",
        required: true
    },
    conversations: [
        {
            type: conversationSchema,
            required: true,
        }
    ]
}, {timestamps: true})
MessageSchema.index({ utilisateur_1: 4, utilisateur_2: 4 }, { unique: true });

module.exports = new mongoose.model("Messages", MessageSchema);
