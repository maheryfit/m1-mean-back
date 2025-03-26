const mongoose=require("mongoose");

const ServiceSchema=new mongoose.Schema({
    nom:{
        type: String,
        required: true,
        unique: true
    },
    description:{
        type:String,
        required: true
    },
    duree_estimee:{
        type: Number,
        required: true,
        validate: {
            validator: (value) => value > 0,
            message: 'Durée estimée ne doit pas être négatif ou null'
        }
    },
    tarif:{
        type: mongoose.Schema.Types.Decimal128,
        required: true,
        validate: {
            validator: (value) => value > 0,
            message: 'Tarif ne doit pas être négatif ou null'
        }
    }
}, {timestamps:true});

module.exports=mongoose.model("Services", ServiceSchema);