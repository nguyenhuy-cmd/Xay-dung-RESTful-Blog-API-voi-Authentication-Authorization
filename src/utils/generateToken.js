// generateToken.js - Hàm tạo JWT token dùng chung cho toàn bộ app
const jwt = require('jsonwebtoken');

/**
 * Tạo JWT token từ userId
 * @param {string} userId - ID của user trong database
 * @returns {string} JWT token
 */
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

module.exports = generateToken;
