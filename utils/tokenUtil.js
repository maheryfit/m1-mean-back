const jwt = require('jsonwebtoken');
const config = require("../config");
const secret = config.JWT_SECRET_KEY;

const generateAccessToken = function (user) {
    const options = { expiresIn: config.TOKEN_DURATION };
    return jwt.sign(user, secret, options);
}

const verifyAccessToken = function (token) {
    try {
        const decoded = jwt.verify(token, secret);
        return { success: true, data: decoded };
    } catch (error) {
        return { success: false, error: error.message };
    }
}
module.exports = {
    generateAccessToken,
    verifyAccessToken
}
