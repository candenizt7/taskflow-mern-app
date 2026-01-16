const { create } = require('../models/Todo');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// HELPER: Token oluştur
const generateToken = (userId) => {
    return jwt.sign(
        { userId },             // Payload
        process.env.JWT_SECRET, // Secret key
        { expiresIn: '7d' }     // 7 gün geçerli
    );
};

// POST /api/auth/register - Kayıt ol
exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    // Email zaten kayıtlıysa
    const existingUser = await User.findOne({email});

    if (existingUser) {
        const error = new Error('Bu email zaten kullanılıyor!');
        error.statusCode = 400;
        throw error;
    }

    // Yeni user oluştur
    const user = await User.create({ 
        name, 
        email, 
        password // Middleware otomatik hash'leyecek!
    });

    // Token oluştur
    const token = generateToken(user._id);

    res.status(201).json({
        success: true,
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });
};

// POST /api/auth/login - Giriş yap
exports.login = async (req, res) => {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
        const error = new Error('Email ve şifre gerekli!');
        error.statusCode = 400;
        throw error;
    }

    // User'ı bul (şifre dahil)
    const user = await User .findOne({ email }).select('+password');

    if (!user) {
        const error = new Error('Geçersiz email veya şifre!');
        error.statusCode = 401;
        throw error;
    }

    // Şifre kontrolü
    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
        const error = new Error('Geçersiz email veya şifre!');
        error.statusCode = 401;
        throw error;
    }

    // Token oluştur
    const token = generateToken(user._id);

    res.json({
        success: true,
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });
};

// GET /api/auth/profile - Profil getir (Protected)
exports.getProfile = async (req, res) => {
    // req.user authMiddleware tarafından eklendi
    res.json({
        success: true,
        user: {
            id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            role: req.user.role,
            createdAt: req.user.createdAt,
        }
    });
};

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    // User'ı bul
    const user = await User.findOne({ email });
    if (!user) {
        const error = new Error('Bu email ile kayıtlı kullanıcı bulunamadı!');
        error.statusCode = 404;
        throw error;
    }

    // Reset token oluştur (basitçe random string)
    const resetToken = crypto.randomBytes(32).toString('hex');

    // Token expire (15 dakika sonra)
    const resetTokenExpire = Date.now() + 900000; // 15 dakika

    // Token'ı ve süresini user'a kaydet
    user.resetToken = resetToken;
    user.resetTokenExpire = resetTokenExpire;
    await user.save();
    // Email gönder (ŞİMDİLİK ATLA, sonra ekleriz)
    // TODO: Email gönder


    // Yanıt gönder
    res.json({
        success: true,
        message: 'Şifre sıfırlama linki email adresinize gönderildi!',
        resetToken
    });

};

exports.resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    // Token'ı doğrula ve user'ı bul
    const user = await User.findOne({
        resetToken: token,
        resetTokenExpire: { $gt: Date.now() } // Token süresi dolmamış
    });

    if (!user) {
        const error = new Error('Geçersiz veya süresi dolmuş token!');
        error.statusCode = 400;
        throw error;
    }

    // Şifreyi güncelle
    user.password = newPassword; // Middleware otomatik hash'leyecek!

    // resetToken ve resetTokenExpire'ı temizle
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;
    await user.save();

    // Yanıt gönder
    res.json({
        success: true,
        message: 'Şifre başarıyla güncellendi!'
    });
}