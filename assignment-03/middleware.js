const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECERT;

async function check(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(403).json({ error: 'No credentials sent!' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, secret); // verify inside the function
        req.user = decoded; // attach user payload to request for downstream use
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
}

module.exports = check