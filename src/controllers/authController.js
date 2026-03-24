const User = require('../models/User');
const jwt = require('jsonwebtoken'); // Công cụ để tạo và soi "Thẻ thông hành" (Token): dùng để tạo đăng nhập và đăng kí 

exports.register = async(req, res) => {
    try{
        const {username, email, password} = req.body;
        const userExist = await User.findOne({email});
        if(userExist) return res.status(400).json({message: 'Email đã tồn tại'})

            const user = await User.create({username, email, password});
            res.status(201).json({message: 'Đăng kí thành công'});
    }catch(error){
        res.status(400).json({error: error.message})
    }
}
exports.login = async(req, res)=> {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message: 'Email không tồn tại'});
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({message: 'Sai mật khẩu'});
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
        res.status(200).json({token});
    }catch(error){
        res.status(400).json({error: error.message})
    }
}        