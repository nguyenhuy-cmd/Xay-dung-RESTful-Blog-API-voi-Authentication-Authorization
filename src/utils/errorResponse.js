// errorResponse.js - Class lỗi tùy chỉnh có kèm status code

/**
 * Class mở rộng từ Error, thêm statusCode để dễ xử lý lỗi
 * Dùng khi muốn throw lỗi kèm mã HTTP (400, 404, 500...)
 * 
 * Ví dụ: throw new ErrorResponse('Không tìm thấy bài viết', 404);
 */
class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

module.exports = ErrorResponse;
