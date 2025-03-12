// Connexion à MongoDB
const config = {
    PORT: process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    TOKEN_DURATION: process.env.TOKEN_DURATION,
    ROLE: ["manager", "client", "mécanicien"],
    DEFAULT_ROLE: "client",
    ORIGINS: ["http://localhost:4200"],
    PRODUCTION: process.env.PRODUCTION || false,
    COOKIE_KEY: process.env.COOKIE_KEY,
    COOKIE_CONFIG: {
        httpOnly: true, // Prevents access from JavaScript
        secure: this.PRODUCTION, // Works only on HTTPS and HTTP
        sameSite: "Strict", // Prevents CSRF
        maxAge: 60 * 1000, // 30 * 24 * 60 * 60 * 1000, // 30 days
    }
}
module.exports = config

