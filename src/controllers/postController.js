const Post = require('../models/Post');

// 1. Lấy tất cả bài viết, phân trang và tìm kiếm
exports.getAllPosts = async (req, res) => {
    try {
        const { page = 1, limit = 10, q, tag } = req.query;
        let query = {};

        // Tìm kiếm theo từ khóa (tìm trong title)
        if (q) {
            query.title = {
                $regex: q,
                $options: 'i'
            };
        }

        // Tìm kiếm tag
        if (tag) {
            query.tags = tag;
        }

        // Phân trang
        const posts = await Post.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .populate('author', 'username') // hiện thêm tác giả thay vì id
            .sort({ createdAt: -1 });

        const count = await Post.countDocuments(query);
        res.json({
            success: true,
            count,
            page: Number(page),
            limit: Number(limit),
            data: posts
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. Tạo bài viết
exports.createPost = async (req, res) => {
    try {
        const { title, content, tags } = req.body;
        const imgURL = req.file ? `/uploads/${req.file.filename}` : null;

        const newPost = await Post.create({
            title,
            content,
            tags: tags ? tags.split(',') : [], // Gửi lên dạng "node, express"
            imgURL,
            author: req.user.id
        });
        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// 3. Lấy 1 bài viết theo ID
exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author', 'username');
        if (!post) return res.status(404).json({ error: 'Bài viết không tồn tại' });
        res.json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 4. Chỉnh sửa bài viết
exports.updatePost = async (req, res) => {
    try {
        const { title, content, tags } = req.body;
        const updateData = {
            ...(title && { title }),
            ...(content && { content }),
            ...(tags && { tags: tags.split(',').map(t => t.trim()) }),
        };
        // Nếu có upload ảnh mới thì cập nhật
        if (req.file) {
            updateData.imgURL = `/uploads/${req.file.filename}`;
        }
        const post = await Post.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!post) return res.status(404).json({ error: 'Bài viết không tồn tại' });
        res.json(post);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// 5. Xóa bài viết
exports.deletePost = async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    return res.json({ message: 'Xóa thành công' });
};