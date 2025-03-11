class UserController {

    constructor(service, config) {
        this.service = service;
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

    logout(req, res){
        res.clearCookie("authToken");
        res.clearCookie("refreshToken");
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

module.exports = UserController;
