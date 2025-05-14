import express from "express";

const utilisateurRouter=express.Router();

utilisateurRouter.get("/checkAuthClient", async (req,res)=>{
    /*
    * cookieKey: <cookie>
    * */
    try{
        const cookie=req.cookies[req.config.COOKIE_KEY];
        if(cookie===undefined){
            res.status(500).send({message:"Votre session est échue. Veuillez vous reconnecter"});
            return;
        }
        const utilisateur=await req.tokenUtil.decodeToken(cookie);
        let autorise=false;
        if(utilisateur.profil===req.config.PROFIL_CLIENT){
            autorise=true;
        }
        res.status(200).send(autorise);
    }catch(error){
        console.error(error);
        res.status(500).send({message:error.message});
    }
});
utilisateurRouter.get("/checkAuthMecanicien", async (req,res)=>{
    /*
    * cookieKey: <cookie>
    * */
    try{
        const cookie=req.cookies[req.config.COOKIE_KEY];
        if(cookie===undefined){
            res.status(500).send({message:"Votre session est échue. Veuillez vous reconnecter"});
            return;
        }
        const utilisateur=await req.tokenUtil.decodeToken(cookie);
        let autorise=false;
        if(utilisateur.profil===req.config.PROFIL_MECANICIEN){
            autorise=true;
        }
        res.status(200).send(autorise);
    }catch(error){
        console.error(error);
        res.status(500).send({message:error.message});
    }
});
utilisateurRouter.get("/checkAuthManager", async (req,res)=>{
    /*
    * cookieKey: <cookie>
    * */
    try{
        const cookie=req.cookies[req.config.COOKIE_KEY];
        if(cookie===undefined){
            res.status(500).send({message:"Votre session est échue. Veuillez vous reconnecter"});
            return;
        }
        const utilisateur=await req.tokenUtil.decodeToken(cookie);
        let autorise=false;
        if(utilisateur.profil===req.config.PROFIL_MANAGER){
            autorise=true;
        }
        res.status(200).send(autorise);
    }catch(error){
        console.error(error);
        res.status(500).send({message:error.message});
    }
});
utilisateurRouter.get("/deconnexion", (req,res)=>{
    try{
        res.clearCookie(req.config.COOKIE_KEY);
        res.sendStatus(200);
    }catch(error){
        console.error(error);
        res.status(500).send({message:error.message});
    }
})

export default utilisateurRouter;
