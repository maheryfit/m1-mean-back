const mongoose=require("mongoose");

const NiveauMecanicienSchema=new mongoose.Schema({
    titre:{
        type:String,
        unique: true,
        required: true
    },
    coefficient_salarial:{
        type: Number,
        default: 1
    }
}, {timestamps: true});

module.exports=mongoose.model("NiveauMecaniciens", NiveauMecanicienSchema);