const mongoose=require("mongoose");
const etatConfig = require("../../config/etats");

const DiagnosticSchema=new mongoose.Schema({
    rdv:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"DemandeRDVDiagnostics",
        required:true
    },
    evaluations:{
        type:String,
        required:true
    },
    dateheure:{
        type:Date,
        default:Date.now
    },
    mecaniciens:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Mecaniciens",
        required:true
    },
    etat:{
        type:String,
        enum:etatConfig.ETAT_DIAGNOSTIC,
        default:etatConfig.DEFAULT_ETAT_DIAGNOSTIC
    }
}, {timestamps:true});

module.exports=mongoose.model("Diagnostics", DiagnosticSchema);