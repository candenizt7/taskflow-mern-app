import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AddTaskForm from "../components/AddTaskForm";
import TodoItem from "../components/TodoItem";
import EmptyState from "../components/EmptyState";
import EditTodoModal from "../components/EditTodoModal";

function Todos() {
  const [todos, setTodos] = useState([]);
  const [dueDate, setDueDate] = useState("");
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTodo, setEditingTodo] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

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
        body: JSON.stringify({
          title: newTodo,
          dueDate: dueDate || null,
        }),
      });

      if (!response.ok) {
        throw new Error("Ağ hatası");
      }
      setNewTodo("");
      setDueDate("");
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
  const handleUpdateTodo = async (id, newTitle, newDueDate) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newTitle, dueDate: newDueDate }), // Yeni title gönder
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

  // handleDeleteAll - Tüm todoları sil
  const handleDeleteAll = async () => {
    // Onay iste!
    const confirm = window.confirm(
      "Are you sure you want to delete ALL tasks?",
    );
    if (!confirm) return; // İptal edildi

    try {
      const token = localStorage.getItem("token");

      // Her todo için DELETE request
      const deletePromises = todos.map((todo) =>
        fetch(`http://localhost:5000/api/todos/${todo._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }),
      );

      // Tüm request'leri paralel çalıştır
      await Promise.all(deletePromises);

      fetchTodos(); // Yenile
    } catch (error) {
      setError(error.message);
    }
  };

  // handleDeleteCompleted - Sadece tamamlananları sil
  const handleDeleteCompleted = async () => {
    const completedTodos = todos.filter((todo) => todo.completed);

    if (completedTodos.length === 0) {
      alert("No completed tasks to delete!");
      return;
    }

    // Onay iste!
    const confirm = window.confirm(
      `Are you sure you want to delete ${completedTodos.length} completed task(s)?`,
    );
    if (!confirm) return; // İptal edildi

    try {
      const token = localStorage.getItem("token");

      // Her completed todo için DELETE request
      const deletePromises = completedTodos.map((todo) =>
        fetch(`http://localhost:5000/api/todos/${todo._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }),
      );

      // Tüm request'leri paralel çalıştır
      await Promise.all(deletePromises);

      fetchTodos(); // Yenile
    } catch (error) {
      setError(error.message);
    }
  };

  //Filter Buttons
  const filteredTodos = todos.filter((todo) => {
    // Filtre için kontrol
    let passesFilter = false;
    if (filter === "all") passesFilter = true;
    if (filter === "active") passesFilter = !todo.completed;
    if (filter === "completed") passesFilter = todo.completed;

    // Search için kontrol
    const passesSearch = todo.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    // Hem filtre hem arama koşullarını sağlayanları döndür
    return passesFilter && passesSearch;
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
            dueDate={dueDate}
            onDateChange={(e) => setDueDate(e.target.value)}
          />

          {/* Search Input */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="🔍 Search todos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

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

          {/* Bulk Delete Buttons */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={handleDeleteCompleted}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
            >
              🗑️ Delete Completed
            </button>
            <button
              onClick={handleDeleteAll}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
            >
              🗑️ Delete All
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

              {filteredTodos.length === 0 && !loading && (
                <EmptyState filter={filter} />
              )}
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
