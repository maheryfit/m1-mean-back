const mongoose=require("mongoose");
const etatConfig=require("../../config/etats");

const RemiseSchema = new mongoose.Schema({
    nomRemise: {
        type: String,
        required: true,
        unique: true
    },
    valeurRemise: {
        type: Number,
        required:true
    }
})

const ArticleQuantiteSchema = new mongoose.Schema({
    article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Articles",
        required: true,
        unique: true
    },
    quantite: {
        type: Number,
        required:true,
        validate: {
            validator: (value) => value > 0,
            message: 'Quantité ne doit pas être négatif ou null'
        }
    }
})


const DevisSchema=new mongoose.Schema({
    voiture:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Voitures",
        required:true
    },
    services: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Services",
        required:true
    }],
    station: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Stations",
        required:true
    },
    articles_quantites: [{
        type:ArticleQuantiteSchema
    }],
    mecanicien:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Mecaniciens",
        required:false
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
    remises: [
        {
            type: RemiseSchema
        }
    ],
    etat: {
        type: String,
        enum: etatConfig.ETAT_DEVIS,
        required: true,
        default: etatConfig.DEFAULT_ETAT_DEVIS
    }
}, {timestamps: true});

module.exports= {
    Devis: mongoose.model("Devis", DevisSchema),
    DevisSchema,
    ArticleQuantiteSchema
};
