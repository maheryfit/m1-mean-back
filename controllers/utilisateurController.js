class UtilisateurController {

    constructor(service, config, util) {
        this.service = service;
        this.util = util;
        this.config = config;
    }

    async login(req, res){
        try {
            const token = await this.service.loginService(req);
            res.cookie(this.config.COOKIE_KEY, token, this.config.COOKIE_CONFIG);
            res.json({message: "Logged in successfully"});
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async register(req, res){
        try {
            const token = await this.service.registerService(req);
            res.cookie(this.config.COOKIE_KEY, token, this.config.COOKIE_CONFIG);
            res.json({message:"Registered"});
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    checkAuthConnected(req, res) {
        res.status(200).json(true);
    }

    checkAuthMecanicien(req, res) {
        res.status(200).json(true);
    }

    checkAuthManager(req, res) {
        res.status(200).json(true);
    }


    logout(req, res){
        this.util.cleanCookie(res)
        res.json({message:"Logged out"});
    }

    async getUsers(req, res){
        try {
            const users = await this.service.getUsersService();
            res.json(users);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

}

module.exports = UtilisateurController;
