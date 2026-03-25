# RESTful Blog API with Authentication & Authorization

Đây là dự án API cho một ứng dụng Blog được xây dựng bằng Node.js và Express, kết hợp với cơ sở dữ liệu MongoDB. Dự án cung cấp các tính năng xác thực (Authentication) bằng JWT, phân quyền (Authorization), và quản lý bài viết (bao gồm cả upload hình ảnh).

## 🚀 Công nghệ sử dụng
- **Node.js** & **Express.js** - Framework backend
- **MongoDB** & **Mongoose** - Hệ quản trị cơ sở dữ liệu
- **JSON Web Token (JWT)** & **Bcrypt.js** - Xác thực và bảo mật mật khẩu
- **Multer** - Xử lý upload file hình ảnh
- **Dotenv** - Quản lý biến môi trường
- **Express Rate Limit** - Giới hạn request để chống spam

## 📂 Cấu trúc dự án
```text
├── src/
│   ├── config/       # Cấu hình dự án (Cơ sở dữ liệu, Biến môi trường .env)
│   ├── controllers/  # Xử lý logic cho các API
│   ├── middlewares/  # Các hàm middleware (Xác thực, Phân quyền, Upload file...)
│   ├── models/       # Định nghĩa Schema cho MongoDB (Post, User)
│   └── routes/       # Khai báo các endpoint API (postRoutes.js...)
├── uploads/          # Thư mục lưu trữ hình ảnh bài viết được upload
├── app.js            # Entry point của ứng dụng
└── package.json      # Quản lý thư viện và script hiện tại
```

## ⚙️ Hướng dẫn cài đặt

1. **Clone dự án (hoặc tải source code về máy)**

2. **Cài đặt các thư viện cần thiết:**
   Mở terminal trong thư mục cấu trúc dự án và chạy:
   ```bash
   npm install
   ```

3. **Thiết lập biến môi trường:**
   Đảm bảo bạn đã có file `.env` trong thư mục `src/config/` với các nội dung cơ bản sau (thay đổi thông tin cho phù hợp với môi trường của bạn):
   ```env
   PORT=8080
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Khởi chạy ứng dụng:**
   - Trạng thái phát triển (`nodemon` sẽ tự động reload khi mã nguồn thay đổi):
     ```bash
     npm run dev
     ```
   - Trạng thái Production:
     ```bash
     npm start
     ```
   
   Nếu cài đặt thành công, ứng dụng sẽ chạy tại địa chỉ: `http://localhost:8080`

## 📡 API Endpoints 

### 📝 Bài viết (Posts) - `/api/posts`
- `GET /api/posts` - Lấy danh sách tất cả bài viết (Public).
- `POST /api/posts` - Tạo bài viết mới. Yêu cầu đăng nhập, cho phép upload ảnh thông qua body field `image`.
- `DELETE /api/posts/:id` - Xóa một bài viết cụ thể. Yêu cầu đăng nhập và người dùng phải là người tạo bài viết hoặc tài khoản có quyền Admin.

## 💡 Lưu ý nhỏ cho Developer
Hiện tại trong `app.js` của bạn, biến `postRoutes` đang được gọi qua `app.use('/api/posts', postRoutes);` nhưng chưa được `require`. Hãy đảm bảo bạn đã thêm dòng import trên đầu file `app.js` để tránh bị lỗi nhé:

```javascript
const postRoutes = require('./src/routes/postRoutes');
```
