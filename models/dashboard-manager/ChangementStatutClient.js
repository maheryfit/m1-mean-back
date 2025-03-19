const mongoose = require('mongoose');

const ChangementStatutClientSchema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clients",
        required: true,
    },
    statut_client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "StatutClients",
        required: true,
    },
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Managers",
        required: true,
    },
    date_heure: {
        type: Date,
        required: true,
    }
}, {timestamps: true});

ChangementStatutClientSchema.pre("save", async function (next) {
    if (this.isNew) {
        this.date_heure = new Date(Date.now())
        next()
    } else {
        next()
    }
})

module.exports = new mongoose.model("ChangementStatutClients", ChangementStatutClientSchema);
