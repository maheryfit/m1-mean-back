const mongoose=require("mongoose");
const etatConfig=require("../../config/etats");

const DevisSchema=new mongoose.Schema({
    voiture:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Voitures",
        required:true
    },
    services:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Services"
    },
    station:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Stations",
        required:true
    },
    articles:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Articles"
    },
    mecanicien:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Mecaniciens",
        required:true
    },
    duree_estimee:{
        type:Number,
        default:0
    },
    montant:{
        type:mongoose.Schema.Types.Decimal128,
        default:0
    },
    dateheure_devis:{
        type:Date,
        default:Date.now
    },
    dateheure_debut_maintenance:{
        type:Date,
        required:true
    },
    finition:{
        type:String,
        enum:["lente", "rapide", "aucune"],
        required:true
    },
    main_oeuvre:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Mecaniciens",
        required:true,
        validate:{
            validator:function(mecaniciens){ return Array.isArray(mecaniciens) && mecaniciens.length>0; },
            message:"Au moins 1 mécanicien doit être assigné à la maintenance."
        }
    },
    etat:{
        type:String,
        enum:etatConfig.ETAT_DEVIS,
        default:etatConfig.DEFAULT_ETAT_DEVIS
    }
}, {timestamps: true});

module.exports=mongoose.model("Devis", DevisSchema);