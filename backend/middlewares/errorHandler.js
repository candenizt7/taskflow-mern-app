// Global Error Handler Middleware
const errorHandler = (error, req, res, next) => {
  console.error('Hata yakalandı:', error.message);
  
  const statusCode = error.statusCode || 500;
  
  res.status(statusCode).json({
    error: error.message || 'Sunucu hatası oluştu',
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
  });
};

module.exports = errorHandler;