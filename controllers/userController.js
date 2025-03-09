class UserController {

    constructor(service) {
        this.service = service;
    }

    async login(req,res){
        try {
            const user = await this.service.login(req);
            res.json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = UserController;
