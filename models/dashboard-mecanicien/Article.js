const mongoose=require("mongoose");

const ArticleSchema=new mongoose.Schema({
    nom:{
        type: String,
        required: true,
        unique: true
    },
    description:{
        type: String
    },
    marque:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Marques",
        required: true
    },
    unite:{
        type: String,
        required: true,
        enum:["unite", "l", "volts", "cm"]
    },
    prix_unitaire:{
        type: mongoose.Schema.Types.Decimal128,
        default: 0
    },
    type:{
        type: String,
        required: true,
        enum: ["piece", "consommable"]
    },
    cout_unitaire_mensuel:{
        type: mongoose.Schema.Types.Decimal128,
        default: 0
    },
    qte_restock_mensuel:{
        type: Number,
        default: 0
    }
}, {timestamps: true});

module.exports=mongoose.model("Articles", ArticleSchema);
