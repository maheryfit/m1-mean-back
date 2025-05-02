export class AuthMiddleware {
    static async checkConnecte(req,res,next){
        try{
            const profils=[req.config.PROFIL_CLIENT,req.config.PROFIL_MECANICIEN,req.config.PROFIL_MANAGER];
            const cookie=req.cookies[req.config.COOKIE_KEY];
            const utilisateur=await req.tokenUtil.decodeToken(cookie);
            if(!profils.includes(utilisateur.profil)){
                res.status(500).send({message:"Votre session est échue. Veuillez vous reconnecter"});
                return;
            }
            next();
        }catch(e){
            console.log(e);
            res.status(500).send({error:e.message});
        }
    }
    static async checkAuthClient(req,res,next){
        /*
        * utilisateur: {
        *   idutilisateur,
        *   nom_utilisateur,
        *   idclient,
        *   profil
        * }
        * */
        try{
            const profils=[req.config.PROFIL_CLIENT,req.config.PROFIL_MECANICIEN,req.config.PROFIL_MANAGER];
            const cookie=req.cookies[req.config.COOKIE_KEY];
            const utilisateur=await req.tokenUtil.decodeToken(cookie);
            if(!profils.includes(utilisateur.profil)){
                res.status(500).send({message:"Votre session est échue. Veuillez vous reconnecter"});
                return;
            }
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
    static async checkAuthMecanicien(req,res,next){
        /*
        * utilisateur: {
        *   idutilisateur,
        *   nom_utilisateur,
        *   idmecanicien,
        *   profil
        * }
        * */
        try{
            const profils=[req.config.PROFIL_CLIENT,req.config.PROFIL_MECANICIEN,req.config.PROFIL_MANAGER];
            const cookie=req.cookies[req.config.COOKIE_KEY];
            const utilisateur=await req.tokenUtil.decodeToken(cookie);
            if(!profils.includes(utilisateur.profil)){
                res.status(500).send({message:"Votre session est échue. Veuillez vous reconnecter"});
                return;
            }
            if(utilisateur.profil!==req.config.PROFIL_MECANICIEN){
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