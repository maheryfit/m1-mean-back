export class AuthMiddleware {
    static async checkAuthClient(req,res,next){
        try{
            const cookie=req.cookies[req.config.COOKIE_KEY];
            if(cookie===undefined){
                res.status(500).send({message:"Votre session est échue. Veuillez vous reconnecter"});
                return;
            }
            const utilisateur=await req.tokenUtil.decodeToken(cookie);
            if(utilisateur.profil!==req.config.PROFIL_CLIENT){
                res.status(500).send({message:"Non autorisé"});
                return;
            }
            req.utilisateur=utilisateur;
            next();
        }catch(error){
            console.error(error);
            res.status(500).send({message:error.message});
        }
    }
}