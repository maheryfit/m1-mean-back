// Connexion à MongoDB
const config = {
    PORT: process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    TOKEN_DURATION: process.env.TOKEN_DURATION,
    PROFIL: ["manager", "client", "mécanicien"],
    TRANSMISSION: ["automatique", "manuel"],
    MOTEUR: ["essence", "diesel", "électrique"],
    TRACTION: ["traction avant", "propulsion", "4*4"],
    DEFAULT_PROFIL: "client",
    ORIGINS: ["http://localhost:4200"],
    PRODUCTION: process.env.PRODUCTION || false,
    COOKIE_KEY: process.env.COOKIE_KEY,
    COOKIE_CONFIG: {
        httpOnly: true, // Prevents access from JavaScript
        secure: this.PRODUCTION, // Works only on HTTPS and HTTP
        sameSite: "Strict", // Prevents CSRF
        maxAge: 2 * 60 * 60 * 1000, // -> 2h // 30 * 24 * 60 * 60 * 1000, // -> 30 days
    },
    REDIS_SERVER_URL: process.env.REDIS_SERVER_URL,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    SOCKET_KEY_REDIS: "socket",
    DELAY_REDIS_SECONDS: process.env.DELAY_REDIS_SECONDS,
}
module.exports = config

