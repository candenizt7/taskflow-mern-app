// ========================================
// TODO TYPESCRİPT TYPES
// ========================================

// 1. TODO INTERFACE (MongoDB'den gelen obje)
export interface Todo {
  _id: string;
  title: string;
  completed: boolean;
  dueDate?: string | null; // ISO date string veya null
  priority: 'low' | 'medium' | 'high';
  tags: string[];
  user: string; // User ID
  createdAt: string;
  updatedAt: string;
}

// 2. API RESPONSE TYPES

// GET /api/todos - Tüm todolar
export interface TodosResponse {
  data: Todo[];
  message?: string;
}

// GET /api/todos/:id - Tek todo
export interface SingleTodoResponse {
  data: Todo;
  message?: string;
}

// DELETE /api/todos/:id - Silme response
export interface DeleteTodoResponse {
  message: string;
  deletedId?: string;
}

// 3. REQUEST TYPES

// POST /api/todos - Yeni todo oluşturma (body)
export interface CreateTodoRequest {
  title: string;
  dueDate?: string | null;
  priority: 'low' | 'medium' | 'high';
  tags: string[];
}

// PUT /api/todos/:id - Todo güncelleme (body)
export interface UpdateTodoRequest {
  title?: string;
  completed?: boolean;
  dueDate?: string | null;
  priority?: 'low' | 'medium' | 'high';
  tags?: string[];
}

// 5. FILTER TYPE
export type FilterType = 'all' | 'active' | 'completed';