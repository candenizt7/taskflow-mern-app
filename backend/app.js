require('dotenv').config();

const express = require('express');
const app = express();
const connectDB = require('./config/db');
const cors = require('cors');

connectDB(); // Veritabanına bağlan

// ============================================
// MIDDLEWARES
// ============================================
const errorHandler = require('./middlewares/errorHandler');

// Body parser middleware
app.use(express.json());

// CORS middleware
app.use(cors({
  origin: 'http://localhost:3000',  // Frontend URL'i
  credentials: true
}));

// ============================================
// ROUTES
// ============================================
const todoRouter = require('./routes/todos');
const authRouter = require('./routes/auth');

// Todo route'larını bağla
app.use('/api/todos', todoRouter);
//       ↑            ↑
//    Prefix       Router dosyası

// Auth route'larını bağla
app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
  res.json({
    message: 'Todo API - MongoDB & Authentication!',
    endpoints: {
      auth : '/api/auth',
      todos: '/api/todos'
    }
  });
});

// ERROR HANDLING MIDDLEWARE
app.use(errorHandler);

// SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Todo API çalışıyor: http://localhost:${PORT}`);
  console.log('Endpoints:');
  console.log('  POST   /api/auth/register');
  console.log('  POST   /api/auth/login');
  console.log('  GET    /api/todos');
  console.log('  POST   /api/todos');
  console.log('  GET    /api/todos/:id');
  console.log('  PUT    /api/todos/:id');
  console.log('  DELETE /api/todos/:id');
});

module.exports = app; // Testler için export et