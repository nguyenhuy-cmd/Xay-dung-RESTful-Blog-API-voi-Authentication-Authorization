const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require:true
    },
    role:{
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, {
    // Tự động thêm createdAt và updatedAt
    timestamps: true
});

// Mã hóa mật khẩu trước khi lưu
userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next;
    this.password = await bcrypt.hash(this.password, 10);
    next();
    if(password.length < 6){
        return res.status(400).json({message: 'Password must be at least 6 characters long'})
    }
});

module.exports = mongoose.model('User', userSchema);