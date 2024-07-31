const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
    const key = process.env.NEXT_PUBLIC_JWT_SECRET;
    return jwt.sign({ id: userId }, key, { expiresIn: '24h' });
};

module.exports = generateToken;
