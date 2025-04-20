export class ConnectionPoolMiddleware{
    static passConnection(connection) {
        return function(req,res,next){
            req.myConnection=connection;
            next();
        }
    }
}