const User = require('../models/user');
const generateToken = require('../utils/auth');

const createUser = async (req, res) => {
    console.log("RESISTERING USER", req.body);

    const { email, password } = req.body;
    try {
        const user = new User({ email, password });
        await user.save();
        const token = generateToken(user._id);

        console.log("REGISTERED");
        res.status(201).json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log("LOG IN", {email, password});
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = generateToken(user._id);
        console.log("LOGGED IN")
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { createUser, loginUser };