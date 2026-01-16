const { z } = require('zod');

// Kayıt olurken hangi kurallar geçerli?
const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2, "İsim en az 2 karakter olmalı"),
    email: z.string().email("Geçersiz email formatı"),
    password: z.string().min(6, "Şifre en az 6 karakter olmalı")
  })
});

module.exports = { registerSchema };