const mongoose = require('mongoose');

// Schema tanımlama
const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Başlık gerekli!'],
        trim: true, // Başlık etrafındaki boşlukları kaldır
        minlength: [3, 'Başlık en az 3 karakter olmalı!'],
    },
    completed: {
        type: Boolean,
        default: false,
    },
    dueDate: {
        type: Date,
        required: false,
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium',
        required: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,   // MongoDB ObjectId
        ref: 'User',                     // İlişkili model, User modeline referans
        required: [true, 'Kullanıcı gerekli!']
    }
}, 
    {
        timestamps: true // createdAt, updatedAt otomatik ekler
    });

// Model oluşturma
const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;