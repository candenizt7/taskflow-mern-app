const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    // 1. Token'ı al (Header'dan)
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      const error = new Error('Token bulunamadı! Lütfen giriş yapın.');
      error.statusCode = 401;
      throw error;
    }
    
    // "Bearer eyJhbGci..." → "eyJhbGci..." (Bearer kısmını kaldır)
    const token = authHeader.split(' ')[1];
    
    // 2. Token'ı doğrula
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3. User'ı bul
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      const error = new Error('Kullanıcı bulunamadı!');
      error.statusCode = 401;
      throw error;
    }
    
    // 4. User bilgisini req'e ekle
    req.user = user;
    req.userId = user._id;
    
    // 5. Devam et
    next();
  } catch (error) {
    // Token geçersiz veya süresi dolmuş
    if (error.name === 'JsonWebTokenError') {
      error.message = 'Geçersiz token!';
      error.statusCode = 401;
    }
    if (error.name === 'TokenExpiredError') {
      error.message = 'Token süresi dolmuş! Lütfen tekrar giriş yapın.';
      error.statusCode = 401;
    }
    
    next(error);
  }
};

module.exports = authMiddleware;