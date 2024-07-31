const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
    const key = process.env.NEXT_PUBLIC_JWT_SECRET;
    return jwt.sign({ id: userId }, key, { expiresIn: '1h' });
};

module.exports = generateToken;
