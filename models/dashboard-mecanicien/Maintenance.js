const mongoose=require("mongoose");

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
        type:Number,
        default:0
    }
}, {timestamps: true});

module.exports=mongoose.model("Maintenances", MaintenanceSchema);