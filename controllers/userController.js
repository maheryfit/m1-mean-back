class UserController {

    constructor(service) {
        this.service = service;
    }

    async login(req, res){
        try {
            const user = await this.service.loginService(req);
            res.json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async register(req, res){
        /*try {
            const user = await this.service.registerService(req);
            res.json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }*/
        console.log(this.service)
        const user = await this.service.registerService(req);
        res.json(user);
    }
}

module.exports = UserController;
