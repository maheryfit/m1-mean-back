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
        default: new Date(Date.now()),
    }
}, {timestamps: true});

ChangementStatutClientSchema.pre("save", function (next) {
    if (this.isNew || this.isModified("date_heure")) {
        this.date_heure = new Date(Date.now())
    }
    next();
})

module.exports = mongoose.model("ChangementStatutClients", ChangementStatutClientSchema);
