export class ToolingMiddleware {
    static passConnection(connection) {
        return function(req,res,next){
            req.myConnection=connection;
            next();
        }
    }
    static passTokenUtil(util){
        return function(req, res, next){
            req.tokenUtil=util;
            next();
        }
    }
    static passConfig(config){
        return function(req, res, next){
            req.config=config;
            next();
        }
    }
}