const mongoose=require("mongoose");

const StationSchema=new mongoose.Schema({
    nom:{
        type: String,
        required: true,
        unique: true
    },
    lieu:{
        type: String,
        required: true
    },
    coordonnees:{
        type:{
            type:String,
            enum:["Point"],
            required: true
        },
        coordinates:{
            type: [Number],
            required: true
        }
    }
});

StationSchema.index({coordinates: "2dsphere"});
module.exports=mongoose.model("Stations", StationSchema);