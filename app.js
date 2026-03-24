require('dotenv').config({ path: './src/config/.env' });
const express = require('express');
const connectDB = require('./src/config/db');

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

app.listen(PORT, () => {
    console.log(`Máy chủ đang chạy trên http://localhost:${PORT}`);
});

