const jwt = require('jsonwebtoken');
const Post = require('../models/Post');

const protect = (req, res, next) => {

    // Lấy token từ header nếu không có token thì trả về lỗi
    const token = req.headers.authorization?.split('')[1];
    if(!token) return res.status(400).json({error: 'Không có quyền truy cập'});

    try{ 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;// Lưu thông tin user vào request
        next();
    }catch(error){
        res.status(400).json( {error: "Không hợp lệ"});
    }
}

const authorization = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return res.status(403).json({error: 'Không có quyền truy cập'});
        }
        next();
    }
}

exports.protect = async(req, res, next) => {
    let token = req.headers.authorization?.split (' ')[1];
    if(!token) return res.status(401).json({error: 'Vui lòng đăng nhập!'});
    try{
        const decoded = jwd.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Lưu thông tin user vào request
        next();
    }catch(error){
        res.status(400).json({error: 'Không hợp lệ'});
    }
};

// kiểm tra quyền (chủ bài hoặc admin)
exports.isOwnerOrAdmin = async(req,res, next) => {
    try{
        const post = await Post.findById(req.params.id);
        if(!post) return res.status(404).json({error: 'Bài viết chưa được viết'});

        if(req.user.role === 'admin' || post.author.toString() ===req.user.id){
            next();
        }else{
            return res.status(403).json({error: 'Ban không được sửa bài này'})
        }
    }catch(err){
        return res.status(500).json({errer: 'Lỗi server'})  
    }
}

module.exports = {protect, authorization};