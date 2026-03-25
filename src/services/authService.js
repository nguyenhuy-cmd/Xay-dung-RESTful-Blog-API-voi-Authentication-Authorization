// authService.js - Tầng xử lý logic nghiệp vụ cho xác thực người dùng
const User = require('../models/User');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');

// Đăng ký tài khoản mới
exports.registerUser = async (username, email, password) => {
    // Kiểm tra email đã tồn tại chưa
    const userExist = await User.findOne({ email });
    if (userExist) throw new Error('Email đã tồn tại');

    // Tạo user mới (password sẽ được hash bởi middleware trong Model)
    const user = await User.create({ username, email, password });
    return user;
};

// Đăng nhập và trả về token
exports.loginUser = async (email, password) => {
    // Tìm user theo email
    const user = await User.findOne({ email });
    if (!user) throw new Error('Email không tồn tại');

    // So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Sai mật khẩu');

    // Tạo JWT token bằng hàm tiện ích
    const token = generateToken(user._id);
    return token;
};