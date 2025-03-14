const mongoose=require("mongoose");

const MecanicienSchema=new mongoose.Schema({
    utilisateur:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Utilisateurs",
        required: true
    },
    telephone:{
        type:String
    },
    role:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"RoleMecaniciens",
        required: true
    },
    niveau: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"NiveauMecaniciens",
        required: true
    }
}, {timestamps: true});

module.exports=mongoose.model("Mecaniciens", MecanicienSchema);