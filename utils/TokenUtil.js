import jwt from "jsonwebtoken";

export class TokenUtil{
    #secret;
    #algorithm;
    #expiration;

    get expiration() {
        return this.#expiration;
    }

    set expiration(value) {
        this.#expiration = value;
    }

    get algorithm() {
        return this.#algorithm;
    }

    set algorithm(value) {
        this.#algorithm = value;
    }

    get secret() {
        return this.#secret;
    }

    set secret(value) {
        this.#secret = value;
    }

    constructor(secret,algorithm,expiration) {
        this.secret = secret;
        this.algorithm = algorithm;
        this.expiration = expiration;
    }

    async generateToken(data){
        const options={
            algorithm:this.algorithm,
            expiresIn:this.expiration,
        }
        return await jwt.sign(data, this.secret, options);
    }
    async decodeToken(token){
        return jwt.verify(token, this.secret);
    }
}
