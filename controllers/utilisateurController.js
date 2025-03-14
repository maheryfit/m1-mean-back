class UtilisateurController {

    constructor(service, config, util) {
        this.service = service;
        this.util = util;
        this.config = config;
    }

    async login(req, res){
        try {
            const response = await this.service.loginService(req);
            res.cookie(this.config.COOKIE_KEY, response[0], this.config.COOKIE_CONFIG);
            res.json(response[1]);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async register(req, res){
        try {
            const response = await this.service.registerService(req);
            res.cookie(this.config.COOKIE_KEY, response[0], this.config.COOKIE_CONFIG);
            res.json(response[1]);
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
