const MecanicienService=require("../../services/dashboard-mecanicien/MecanicienService");
class MecanicienController{
    constructor(){
        this.service=new MecanicienService();
    }
    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    async horaireTravail(req, res){
        try{
            const horaireTravail=await this.service.horaireTravail(req.params.id);
            res.status(201).json(horaireTravail);
        }catch(error){
            res.status(500).json({message: error.message});
        }
    }
}

module.exports=MecanicienController;