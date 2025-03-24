const mongoose=require("mongoose");
const etatConfig=require("../../config/etats");

const DetailsMaintenanceSchema=new mongoose.Schema({
    maintenance:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Maintenances",
        required:true
    },
    service:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Services",
        required:true
    },
    mecaniciens:{
        type:[mongoose.Schema.Types.ObjectId],
        ref: "Mecaniciens",
        required:true,
        validate:{
            validator: function(mecaniciens){ return Array.isArray(mecaniciens) && mecaniciens.length>0; },
            message:"Au moins 1 mécanicien doit être assigné au service en cours."
        }
    },
    articles:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Articles"
    },
    dateheure_debut:{
        type:Date,
        default:Date.now
    },
    dateheure_fin:{
        type:Date,
        required:true
    },
    etat:{
        type:String,
        enum:etatConfig.ETAT_DETAIL_MAINTENANCE,
        default:etatConfig.DEFAULT_ETAT_DETAIL_MAINTENANCE
    }
}, {timestamps: true});

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
    etat:{
        type:String,
        enum:etatConfig.ETAT_MAINTENANCE,
        default:etatConfig.DEFAULT_ETAT_MAINTENANCE
    },
    detailMaintenances : [
        {
            type: DetailsMaintenanceSchema,
            required: true,
        }
    ]
}, {timestamps: true});

module.exports=mongoose.model("Maintenances", MaintenanceSchema);
