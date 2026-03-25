// authController.js - Tầng điều khiển: chỉ nhận request, gọi service, trả response
const authService = require('../services/authService');

// Đăng ký
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        await authService.registerUser(username, email, password);
        res.status(201).json({ message: 'Đăng kí thành công' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Đăng nhập
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await authService.loginUser(email, password);
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};