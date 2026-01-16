const express = require('express');
const router = express.Router();
const asyncHandler = require('../middlewares/asyncHandler');
const authMiddleware = require('../middlewares/authMiddleware');  // ← YENİ!
const todoController = require('../controllers/todoController');

// ============================================
// TÜM ROUTES ARTIK PROTECTED! (Login gerekli!)
// ============================================

// Tüm route'lara authMiddleware ekle
router.use(authMiddleware);  // route'lara uygulanır!

// GET /api/todos - Tüm todo'lar (sadece kendi todo'ların!)
router.get('/', asyncHandler(todoController.getAllTodos));

// GET /api/todos/:id - Tek todo
router.get('/:id', asyncHandler(todoController.getTodoById));

// POST /api/todos - Yeni todo ekle
router.post('/', asyncHandler(todoController.createTodo));

// PUT /api/todos/:id - Todo güncelle
router.put('/:id', asyncHandler(todoController.updateTodo));

// DELETE /api/todos/:id - Todo sil
router.delete('/:id', asyncHandler(todoController.deleteTodo));

module.exports = router;