const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
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

ConversationSchema.pre("save", async function (next) {
    if (this.isNew) {
        try {
            this.date_heure_contenu = new Date(Date.now())
            next()
        } catch (e) {
            next(e)
        }
    } else {
        next();
    }
})

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
            type: ConversationSchema,
            required: true,
        }
    ]
}, {timestamps: true})
MessageSchema.index({ utilisateur_1: 4, utilisateur_2: 4 }, { unique: true });

module.exports = new mongoose.model("Messages", MessageSchema);
