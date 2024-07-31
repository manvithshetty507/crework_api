const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'No token provided' });

    try {
        const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next()
    }catch(error) {
        res.status(401).json({ error: 'Invalid token' });
    }
}

module.exports = authMiddleware;