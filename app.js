require('dotenv').config({ path: './src/config/.env' });
const express = require('express');
const connectDB = require('./src/config/db');
const path = require('path');
const postRoutes = require('./src/routes/postRoutes');
const authRoutes = require('./src/routes/authRoutes');

const app = express();

const PORT = process.env.PORT || 8080;

// Kết nối với cơ sở dữ liệu MongoDB
connectDB();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route cơ bản để kiểm tra server
app.get('/', (req, res) => {
    res.send('Máy chủ đang chạy!');
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

app.use((err, req, res, next) =>{
    res.status(err.status || 500).json({
        error: err.message|| 'Lỗi Server'
    })
}) 

app.listen(PORT, () => {
    console.log(`Máy chủ đang chạy trên http://localhost:${PORT}`);
});

module.exports = app;
