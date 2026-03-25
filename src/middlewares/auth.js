// auth.js - Middleware xác thực và phân quyền
const verifyToken = require('../utils/verifyToken');
const Post = require('../models/Post');

// Middleware xác thực token (bảo vệ route)
const protect = async (req, res, next) => {
    // Lấy token từ header Authorization: "Bearer <token>"
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Vui lòng đăng nhập!' });

    try {
        const decoded = verifyToken(token); // Dùng hàm tiện ích thay vì jwt.verify trực tiếp
        req.user = decoded; // Lưu thông tin user vào request
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token không hợp lệ' });
    }
};

// Middleware phân quyền theo role (admin, user...)
const authorization = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Không có quyền truy cập' });
        }
        next();
    };
};

// Middleware kiểm tra quyền (chủ bài viết hoặc admin)
const isOwnerOrAdmin = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ error: 'Bài viết không tồn tại' });

        if (req.user.role === 'admin' || post.author.toString() === req.user.id) {
            next();
        } else {
            return res.status(403).json({ error: 'Bạn không được sửa bài này' });
        }
    } catch (err) {
        return res.status(500).json({ error: 'Lỗi server' });
    }
};

module.exports = { protect, authorization, isOwnerOrAdmin };