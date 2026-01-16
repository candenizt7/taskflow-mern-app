const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'İsim gerekli!'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email gerekli!'],
    unique: true,  // Aynı email 2 kez olamaz
    lowercase: true,  // Küçük harfe çevir
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Geçerli bir email girin!'
    ]
  },
  password: {
    type: String,
    required: [true, 'Şifre gerekli!'],
    minlength: [6, 'Şifre en az 6 karakter olmalı!'],
    select: false  // find() ile gelmesin (güvenlik)
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  resetToken: {
    type: String,
    required: false,
    select: false
  },
  resetTokenExpire: {
    type: Date,
    required: false,
    select: false
  }
}, {
  timestamps: true
});

// MIDDLEWARE: Şifreyi kaydetmeden önce hashle
userSchema.pre('save', async function() {
  // Şifre değişmediyse hash'leme!
  if (!this.isModified('password')) {
    return;
  }
  
  // Şifreyi hash'le
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  console.log('Şifre hash\'lendi!');
});

// METHOD: Şifre doğrulama
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;