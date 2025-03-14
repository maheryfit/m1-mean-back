const mongoose=require("mongoose");

const RoleMecanicienSchema=new mongoose.Schema({
    titre:{
        type: String,
        unique: true,
        required: true
    },
    salaire_mensuel:{
        type: mongoose.Schema.Types.Decimal128,
        default: 0
    }
}, {timestamps: true});

module.exports=mongoose.model("RoleMecaniciens", RoleMecanicienSchema);