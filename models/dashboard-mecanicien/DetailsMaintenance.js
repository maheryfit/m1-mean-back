const mongoose=require("mongoose");

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
        type:Number,
        default:0
    }
}, {timestamps: true});

module.exports=mongoose.model("DetailsMaintenances", DetailsMaintenanceSchema);