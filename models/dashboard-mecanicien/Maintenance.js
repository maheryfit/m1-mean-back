const mongoose=require("mongoose");
const etatConfig=require("../../config/etats");

const DetailsMaintenanceSchema=new mongoose.Schema({
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
        default:Date.now,
        required: true
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
    dateheure_debut:{
        type:Date,
        required: true
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
    devis: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Devis",
        required: true
    },
    detailMaintenances : [
        {
            type: DetailsMaintenanceSchema,
        }
    ]
}, {timestamps: true});

module.exports=mongoose.model("Maintenances", MaintenanceSchema);
