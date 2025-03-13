const jwt = require('jsonwebtoken');
const config = require("../config");
const secret = config.JWT_SECRET_KEY;

const generateAccessToken = function (user) {
    const options = { expiresIn: config.TOKEN_DURATION };
    return jwt.sign(user, secret, options);
}

const getDataFromToken = function (token) {
    return jwt.verify(token, secret);
}

const getDataFromRequestToken = function (request) {
    const token = getTokenFromCookie(request);
    return jwt.verify(token, secret);
}

const verifyAccessToken = function (token) {
    try {
        const decoded = getDataFromToken(token);
        return { success: true, data: decoded };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

function getTokenFromAuthorization(req) {
    // Si vous voulez utiliser le localStorage
    const authHeader = req.headers['authorization'];
    return authHeader && authHeader.split(' ')[1];
}

function getTokenFromCookie(req) {
    return req.cookies[config.COOKIE_KEY]
}

function cleanCookie (res) {
    res.clearCookie(config.COOKIE_KEY);
    res.clearCookie("refreshToken");
}

/**
 *
 * @param {Request} req
 * @param {any} model
 * @param {string} field
 * @returns {Promise<void>}
 */
async function checkIfHavePermission(req, model, field) {
    const client = getDataFromRequestToken(req)
    const response = await model.findById(req.params.id);
    if (!response) {
        throw new Error('Not Found');
    }
    if (response[field].toString() !== client.id) {
        throw new Error('You dont have permission to use this service.');
    }
}

module.exports = {
    generateAccessToken,
    verifyAccessToken,
    getDataFromToken,
    getTokenFromCookie,
    checkIfHavePermission,
    getTokenFromAuthorization,
    getDataFromRequestToken,
    cleanCookie
}
