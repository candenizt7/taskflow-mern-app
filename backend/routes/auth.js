const express = require('express');
const router = express.Router();
const asyncHandler = require('../middlewares/asyncHandler');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validate');
const { registerSchema } = require('../validations/authValidation');

// AUTH ROUTES
// POST /api/auth/register - Kayıt ol
router.post('/register', validate(registerSchema), asyncHandler(authController.register));

// POST /api/auth/login - Giriş yap
router.post('/login', asyncHandler(authController.login));

// PROTECTED ROUTES (Token gerekli)
// GET /api/auth/profile - Profil getir
router.get('/profile', authMiddleware, asyncHandler(authController.getProfile));
//                          ↑
//                authMiddleware önce çalışır

router.post('/forgot-password', asyncHandler(authController.forgotPassword));
router.post('/reset-password', asyncHandler(authController.resetPassword));

module.exports = router;