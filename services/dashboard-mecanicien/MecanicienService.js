const DetailsMaintenance=require("../../models/dashboard-mecanicien/DetailsMaintenance");
const mongoose=require("mongoose");

class MecanicienService{
    async horaireTravail(id){
        const horaireTravail=await DetailsMaintenance.aggregate([
            {
                $match:{
                    mecaniciens:mongoose.Types.ObjectId(id)
                }
            },
            {
                $project:{
                    duree:{ $substract: ["dateheure_fin", "dateheure_debut"]}
                }
            },
            {
                $group:{
                    _id:null,
                    horaireTravail:{$sum:"$duree"}
                }
            }
        ]);
        return horaireTravail[0]?.horaireTravail||0;
    }
}

module.exports=MecanicienService;