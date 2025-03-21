const _BEST_DIFF_DAY = 1
const config = require("../../config");
const mongoose = require('mongoose');
const DemandeRDVDiagnosticSchema = new mongoose.Schema({
    voiture: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Voitures",
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    date_favorable: {
        type: Date,
        required: true,
        validate: {
            /**
             *
             * @param {Date} value
             */
            validator: (value) => {
                const actualDateFuture = new Date(Date.now())
                actualDateFuture.setDate(actualDateFuture.getDate() + _BEST_DIFF_DAY)
                return value >= actualDateFuture
            },
            message: `La date favorable doit être au moins ${_BEST_DIFF_DAY} jours en avance à compter d'aujourd'hui ${new Date(Date.now()).toDateString()} `
        }
    },
    station: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Stations",
        required: true
    },
    etat: {
        type: String,
        required: false,
        enum: config.ETAT_DEMANDE_RDV_DIAG,
        default: config.DEFAULT_ETAT_DEMANDE_RDV_DIAG
    }
}, {timestamps: true});
DemandeRDVDiagnosticSchema.index({ date_favorable: 3, voiture: 3 }, { unique: true });

module.exports = mongoose.model("DemandeRDVDiagnostics", DemandeRDVDiagnosticSchema)
