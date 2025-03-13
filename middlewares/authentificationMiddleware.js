const verifyAccessToken = require("../utils/tokenUtil").verifyAccessToken
const getTokenFromCookie = require("../utils/tokenUtil").getTokenFromCookie;

function authenticateToken(req, res, next) {
    const result = authenticate(req)
    if (result === false ) {
        return res.sendStatus(401);
    }
    req.user = result.data
    next();
}

function authenticateTokenManager(req, res, next) {
    const result = authenticateTokenWithProfile(req, "manager")
    if (result.hasOwnProperty("error")) {
        return res.status(403).json({ error: result.error });
    }
    if (result === false ) {
        return res.sendStatus(401);
    }
    next()
}

function authenticateTokenMecanicien(req, res, next) {
    const result = authenticateTokenWithProfile(req, "mécanicien")
    if (result.hasOwnProperty("error")) {
        return res.status(403).json({ error: result.error });
    }
    if (result === false ) {
        return res.sendStatus(401);
    }
    next()
}

function authenticateTokenClient(req, res, next) {
    const result = authenticateTokenWithProfile(req, "client")
    if (result.hasOwnProperty("error")) {
        return res.status(403).json({ error: result.error });
    }
    if (result === false ) {
        return res.sendStatus(401);
    }
    next()
}

function authenticateTokenWithProfile(req, profil) {
    const result = authenticate(req)
    if (result === false ) {
        return false;
    }
    if (result.hasOwnProperty("error")) {
        return { error: result.error };
    }
    const userRole = result.data.profil
    if (userRole !== profil) {
        return false
    }
    req.user = result.data
    return { success: true }
}



function authenticate(req) {

    const token = getTokenFromCookie(req);
    if (token === undefined || token === '') {
        return false
    }

    const result = verifyAccessToken(token);

    if (!result.success) {
        return { error : result.error };
    }

    return { data: result.data }
}

module.exports = {
    authenticateToken: authenticateToken,
    authenticateTokenClient: authenticateTokenClient,
    authenticateTokenManager: authenticateTokenManager,
    authenticateTokenMecanicien: authenticateTokenMecanicien,
}
