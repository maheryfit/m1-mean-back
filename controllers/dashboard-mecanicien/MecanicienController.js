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
            const horaireTravail=await this.service.horaireTravail(req);
            res.status(200).json(horaireTravail);
        }catch(error){
            res.status(500).json({message: error.message});
        }
    }

    /**
     *
     * @param {Request} req
     * @param {Response} res
     */
    async getKPIMecanicien(req, res){
        try{
            const kpi=await this.service.getKPIMecanicienService(req);
            res.status(200).json(kpi);
        }catch(error){
            res.status(500).json({message: error.message});
        }
    }

    /**
     *
     * @param {Request} req
     * @param {Response} res
     */
    async horaireTravailReel(req, res){
        try{
            const horaireTravail=await this.service.horaireTravailReel(req);
            res.status(200).json(horaireTravail);
        }catch(error){
            res.status(500).json({message: error.message});
        }
    }

    /**
     *
     * @param {Request} req
     * @param {Response} res
     */
    async create(req, res) {
        try {
            const newMecanicien = await this.service.createService(req);
            res.status(201).json(newMecanicien);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    /**
     *
     *
     * @param {Request} req
     * @param {Response} res
     */
    async registerMany(req, res){
        try {
            await this.service.registerManyService(req);
            res.status(201).json({message: "Success"});
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    /**
     *
     * @param {Request} req
     * @param {Response} res
     */
    async update(req, res) {
        try {
            const station = await this.service.updateService(req);
            res.status(200).json(station);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }


    /**
     *
     * @param {Request} req
     * @param {Response} res
     */
    async getAll(req, res) {
        try {
            const mecaniciens = await this.service.getAllService();
            mecaniciens.forEach(mecanicien=> {
                mecanicien.createdAt = mecanicien.createdAt.toLocaleString()
                mecanicien.updatedAt = mecanicien.updatedAt.toLocaleString()
            })
            res.status(200).json(mecaniciens);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }


    /**
     *
     * @param {Request} req
     * @param {Response} res
     */
    async findById(req, res) {
        try {
            const station = await this.service.findByIdService(req);
            res.status(200).json(station);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async findByUser(req, res) {
        try {
            const mecanicien = await this.service.findByUser(req);
            res.status(200).json(mecanicien[0]);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }


    /**
     *
     * @param {Request} req
     * @param {Response} res
     */
    async delete(req, res) {
        try {
            await this.service.deleteService(req);
            res.status(204).json({message: 'Mécanicien deleted'});
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports=MecanicienController;