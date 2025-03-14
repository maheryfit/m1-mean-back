const mongoose=require("mongoose");

const ServiceSchema=new mongoose.Schema({
    nom:{
        type: String,
        required: true,
        unique: true
    },
    description:{
        type:String
    },
    duree_estimee:{
        type: Number,
        default: 0
    },
    tarif:{
        type: mongoose.Schema.Types.Decimal128,
        default: 0
    }
}, {timestamps:true});

module.exports=mongoose.model("Services", ServiceSchema);