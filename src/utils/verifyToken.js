// verifyToken.js - Hàm xác thực JWT token dùng chung
const jwt = require('jsonwebtoken');

/**
 * Xác thực và giải mã JWT token
 * @param {string} token - JWT token cần xác thực
 * @returns {object} Thông tin đã giải mã từ token (vd: { id: userId })
 * @throws {Error} Nếu token không hợp lệ hoặc hết hạn
 */
const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = verifyToken;
