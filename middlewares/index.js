const verifyAccessToken = require("../utils/tokenUtil").verifyAccessToken

function authenticateToken(req, res, next) {
    const result = authenticate(req, res)
    if (result === false ) {
        return res.sendStatus(401);
    }
    req.user = result.data
    next();
}

function authenticateTokenManager(req, res, next) {
    const result = authenticateTokenWithRole(req, res, "manager")
    if (result.hasOwnProperty("error")) {
        return res.status(403).json({ error: result.error });
    }
    if (result === false ) {
        return res.sendStatus(401);
    }
    next()
}

function authenticateTokenMecanicien(req, res, next) {
    const result = authenticateTokenWithRole(req, res, "mécanicien")
    if (result.hasOwnProperty("error")) {
        return res.status(403).json({ error: result.error });
    }
    if (result === false ) {
        return res.sendStatus(401);
    }
    next()
}

function authenticateTokenClient(req, res, next) {
    const result = authenticateTokenWithRole(req, res, "client")
    if (result.hasOwnProperty("error")) {
        return res.status(403).json({ error: result.error });
    }
    if (result === false ) {
        return res.sendStatus(401);
    }
    next()
}

function authenticateTokenWithRole(req, res, role) {
    const result = authenticate(req, res)
    if (result === false ) {
        return false;
    }
    const userRole = result.data.role
    if (userRole !== role) {
        return false
    }
    req.user = result.data
    return { success: true }
}

function authenticate(req, res) {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

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
