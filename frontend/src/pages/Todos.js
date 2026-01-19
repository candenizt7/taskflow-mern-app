import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AddTaskForm from "../components/AddTaskForm";
import TodoItem from "../components/TodoItem";
import EmptyState from "../components/EmptyState";
import EditTodoModal from "../components/EditTodoModal";

function Todos() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTodo, setEditingTodo] = useState(null);
  const [filter, setFilter] = useState("all");

  // Sayfa yüklenince todoları çek
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/api/todos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ağ hatası");
        }
        return response.json();
      })
      .then((data) => {
        setTodos(data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // fetchTodos - GET /api/todos
  const fetchTodos = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/todos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Ağ hatası");
      }
      const data = await response.json();
      setTodos(data.data);
    } catch (error) {
      setError(error.message);
    }
  };

  // handleAddTodo - POST /api/todos
  const handleAddTodo = async () => {
    if (!newTodo || newTodo.trim().length < 3) {
      setError("Başlık en az 3 karakter olmalı!");
      return; // İşlemi durdur!
    }

    try {
      setError("");
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newTodo }),
      });

      if (!response.ok) {
        throw new Error("Ağ hatası");
      }
      setNewTodo("");
      fetchTodos();
    } catch (error) {
      setError(error.message);
    }
  };

  // handleDeleteTodo - DELETE /api/todos/:id
  const handleDeleteTodo = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Ağ hatası");
      }
      fetchTodos();
    } catch (error) {
      setError(error.message);
    }
  };

  // handleToggleTodo - PUT /api/todos/:id
  const handleToggleTodo = async (id, completed) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ completed: !completed }),
      });

      if (!response.ok) {
        throw new Error("Ağ hatası");
      }
      fetchTodos();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
  };

  // handleUpdateTodo - PUT /api/todos/:id
  const handleUpdateTodo = async (id, newTitle) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newTitle }), // Yeni title gönder
      });

      if (!response.ok) {
        throw new Error("Ağ hatası");
      }

      setEditingTodo(null); // Modal'ı kapat
      fetchTodos(); // Todoları yenile
    } catch (error) {
      setError(error.message);
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-gray-50">
        <div className="max-w-5xl mx-auto p-8">
          {/* Header */}
          <Header
            userName={localStorage.getItem("userName")}
            onLogout={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("userName");
              window.location.href = "/login";
            }}
          />

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {/* Add Task Form */}
          <AddTaskForm
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onSubmit={handleAddTodo}
          />

          {/* Filter Buttons */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              All
            </button>

            <button
              onClick={() => setFilter("active")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === "active"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              Active
            </button>

            <button
              onClick={() => setFilter("completed")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === "completed"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              Completed
            </button>
          </div>

          {/* Loading or Tasks */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="text-gray-500 mt-4">Loading tasks...</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredTodos.map((todo) => (
                <TodoItem
                  key={todo._id}
                  todo={todo}
                  onToggle={handleToggleTodo}
                  onDelete={handleDeleteTodo}
                  onEdit={handleEdit}
                />
              ))}

              {filteredTodos.length === 0 && !loading && <EmptyState filter={filter} />}
            </div>
          )}

          {/* Edit Modal */}
          {editingTodo && (
            <EditTodoModal
              todo={editingTodo}
              onClose={() => setEditingTodo(null)}
              onSave={handleUpdateTodo}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default Todos;
