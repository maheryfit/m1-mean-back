import express from "express";

const utilisateurRouter=express.Router();

utilisateurRouter.get("/checkAuthClient", async (req,res)=>{
    /*
    * cookieKey: <cookie>
    * */
    try{
        const cookie=req.cookies[req.config.COOKIE_KEY];
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

export default utilisateurRouter;