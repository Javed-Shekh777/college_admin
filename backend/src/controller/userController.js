const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { errorResponse, successResponse } = require('../utils/response');
const { Tokens } = require('../constans');

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({
            $or: [{ email: email }, { username: email }]
        });

        console.log(user);
        if (!user) return errorResponse(res, 'User not found', 404);

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return errorResponse(res, 'Invalid password', 400);

        const token = jwt.sign({ id: user._id }, Tokens.acessToken, { expiresIn: Tokens.accessTokenExpiry });
        return successResponse(res, 'Login successful', { token, user });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
