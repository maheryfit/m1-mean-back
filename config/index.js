// Connexion à MongoDB
const config = {
    PORT: process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    TOKEN_DURATION: process.env.TOKEN_DURATION,
    ROLE: ["manager", "client", "mécanicien"],
    DEFAULT_ROLE: "client"
}
module.exports = config

