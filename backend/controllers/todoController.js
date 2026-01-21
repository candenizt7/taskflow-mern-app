const Todo = require('../models/Todo');

// GET /api/todos - SADECE KENDİ todo'larını getir

exports.getAllTodos = async (req, res) => {
  // Query parametrelerini al
  const { completed, search, sort, page, limit  } = req.query;

  // Filter objesi - SADECE bu kullanıcının todo'ları!
  const filter = { user: req.userId };

  // 2. Completed filtresi
  if (completed !== undefined) {
    filter.completed = completed === 'true';
  }

   // 3. Search filtresi (başlıkta arama)
  if (search) {
    filter.title = { $regex: search, $options: 'i' };  // Case-insensitive arama
  }

  // 4. Query oluştur
  let query = Todo.find(filter);
  
  // 5. Sıralama
  if (sort) {
    query = query.sort(sort);  // "createdAt" veya "-createdAt"
  } else {
    query = query.sort('-createdAt');  // Default: En yeni önce
  }

  // 6. Pagination
  if (page && limit) {
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;
    
    query = query.skip(skip).limit(limitNum);
  }

  // 7. Query'yi çalıştır
  const todos = await query;
  
  // 8. Toplam sayı (pagination için) - Frontend'de sayfa sayısını hesaplamak için
  const total = await Todo.countDocuments(filter);
  
  res.json({
    success: true,
    count: todos.length,
    total: total,
    data: todos
  });
};

// GET /api/todos/:id - Tek todo getir (Sadece kendi todo'su)
exports.getTodoById = async (req, res) => {
  const todo = await Todo.findOne({
    _id: req.params.id,
    user: req.userId  // Sadece kendi todo'su
  });

  if (!todo) {
    const error = new Error('Todo bulunamadı');
    error.statusCode = 404;
    throw error;
  }

  res.json(todo);
};

// POST /api/todos - Yeni todo ekle (Otomatik kullanıcıya bağla)
exports.createTodo = async (req, res) => {
  const { title, completed, dueDate, priority } = req.body;

  const newTodo = await Todo.create({
    title,
    completed,
    dueDate,
    priority,
    user: req.userId  // Otomatik authMiddleware'den geldi
  });

  res.status(201).json(newTodo);
};

// PUT /api/todos/:id - Todo güncelle (Sadece kendi todo'su)
exports.updateTodo = async (req, res) => {
  const { title, completed, dueDate, priority } = req.body;

  const todo = await Todo.findOneAndUpdate(
    {
      _id: req.params.id,
      user: req.userId  // Sadece kendi todo'su!
    },
    { title, completed, dueDate, priority },
    { new: true, runValidators: true }
  );

  if (!todo) {
    const error = new Error('Todo bulunamadı veya yetkiniz yok!');
    error.statusCode = 404;
    throw error;
  }

  res.json(todo);
};

// DELETE /api/todos/:id - Todo sil (Sadece kendi todo'su)
exports.deleteTodo = async (req, res) => {
  const todo = await Todo.findOneAndDelete({
    _id: req.params.id,
    user: req.userId  // Sadece kendi todo'su
  });

  if (!todo) {
    const error = new Error('Todo bulunamadı veya yetkiniz yok!');
    error.statusCode = 404;
    throw error;
  }

  res.status(204).send();
};