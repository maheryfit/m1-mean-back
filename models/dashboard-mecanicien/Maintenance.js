const mongoose=require("mongoose");
const etatConfig=require("../../config/etats");

const MaintenanceSchema=new mongoose.Schema({
    voiture:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Voitures",
        required:true
    },
    dateheure_debut:{
        type:Date,
        required:true
    },
    dateheure_fin:{
        type:Date
    },
    station:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Stations",
        required: true
    },
    devis:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Devis",
        required:true
    },
    etat:{
        type:String,
        enum:etatConfig.ETAT_MAINTENANCE,
        default:etatConfig.DEFAULT_ETAT_MAINTENANCE
    }
}, {timestamps: true});

module.exports=mongoose.model("Maintenances", MaintenanceSchema);