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
        enum:["unite"]
    },
    prix_unitaire:{
        type: mongoose.Schema.Types.Decimal128,
        default: 0
    },
    type:{
        type: String,
        required: true,
        enum: ["piece", "consommable"]
    }
}, {timestamps: true});

module.exports=mongoose.model("Articles", ArticleSchema);