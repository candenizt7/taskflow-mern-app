import { useEffect, useState, ChangeEvent } from "react";
import toast, { Toaster } from "react-hot-toast";
import Sidebar from "../components/Sidebar.js";
import Header from "../components/Header.js";
import AddTaskForm from "../components/AddTaskForm.js";
import TodoItem from "../components/TodoItem.js";
import EmptyState from "../components/EmptyState.tsx";
import EditTodoModal from "../components/EditTodoModal.js";
import Statistics from "../components/Statistics.js";

// ========================================
// TYPE IMPORTS - BUNU EKLE
// ========================================
import {
  Todo,
  TodosResponse,
  CreateTodoRequest,
  UpdateTodoRequest,
  DeleteTodoResponse,
  FilterType,
} from "../types/todo.types";

function Todos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [dueDate, setDueDate] = useState<string>("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [tags, setTags] = useState<string>("");
  const [newTodo, setNewTodo] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

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
      .then((data: TodosResponse) => {
        setTodos(data.data);
        setLoading(false);
        checkNotifications(data.data);
      })
      .catch((error) => {
        setError((error as Error).message);
        setLoading(false);
      });
  }, []);

  // fetchTodos - GET /api/todos
  const fetchTodos = async (): Promise<void> => {
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
      const data: TodosResponse = await response.json();
      setTodos(data.data);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  // Notification kontrolü
  const checkNotifications = (todosData: Todo[]): void => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Sadece tamamlanmamış todolar
    const incompleteTodos = todosData.filter((todo) => !todo.completed);

    // Geçmiş tarihli (overdue)
    const overdueTodos = incompleteTodos.filter((todo) => {
      if (!todo.dueDate) return false;
      const dueDate = new Date(todo.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      return dueDate < today;
    });

    // Bugün yapılacaklar
    const dueTodayTodos = incompleteTodos.filter((todo) => {
      if (!todo.dueDate) return false;
      const dueDate = new Date(todo.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      return dueDate.getTime() === today.getTime();
    });

    // Yarın yapılacaklar
    const dueTomorrowTodos = incompleteTodos.filter((todo) => {
      if (!todo.dueDate) return false;
      const dueDate = new Date(todo.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      return dueDate.getTime() === tomorrow.getTime();
    });

    // Toast göster
    if (overdueTodos.length > 0) {
      toast.error(
        `🔴 ${overdueTodos.length} overdue task${overdueTodos.length > 1 ? "s" : ""}!`,
        {
          duration: 5000,
          position: "top-right",
        },
      );
    }

    if (dueTodayTodos.length > 0) {
      toast(
        `🟡 ${dueTodayTodos.length} task${dueTodayTodos.length > 1 ? "s" : ""} due today!`,
        {
          duration: 4000,
          position: "top-right",
          style: {
            background: "#fbbf24",
            color: "white",
          },
        },
      );
    }

    if (dueTomorrowTodos.length > 0) {
      toast(
        `⚠️ ${dueTomorrowTodos.length} task${dueTomorrowTodos.length > 1 ? "s" : ""} due tomorrow!`,
        {
          duration: 3000,
          position: "top-right",
          style: {
            background: "#3b82f6",
            color: "white",
          },
        },
      );
    }
  };

  // handleAddTodo - POST /api/todos
  const handleAddTodo = async (): Promise<void> => {
    if (!newTodo || newTodo.trim().length < 3) {
      setError("Başlık en az 3 karakter olmalı!");
      return; // İşlemi durdur!
    }

    try {
      setError("");

      // Tags string'i array'e çevir
      const tagsArray = tags
        .split(",") // Virgülle ayır
        .map((tag) => tag.trim()) // Boşlukları temizle
        .filter((tag) => tag.length > 0); // Boş olanları çıkar

      const token = localStorage.getItem("token");

      const body: CreateTodoRequest = {
        title: newTodo,
        dueDate: dueDate || null,
        priority: priority,
        tags: tagsArray,
      };

      const response = await fetch("http://localhost:5000/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Ağ hatası");
      }
      setNewTodo("");
      setDueDate("");
      setPriority("medium");
      setTags("");
      fetchTodos();
    } catch (error) {
      setError((error as Error).message);
    }
  };

  // handleDeleteTodo - DELETE /api/todos/:id
  const handleDeleteTodo = async (id: string): Promise<void> => {
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
      setError((error as Error).message);
    }
  };

  // handleToggleTodo - PUT /api/todos/:id
  const handleToggleTodo = async (
    id: string,
    completed: boolean,
  ): Promise<void> => {
    try {
      const token = localStorage.getItem("token");
      const body: UpdateTodoRequest = {
        completed: !completed,
      };
      const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Ağ hatası");
      }
      fetchTodos();
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleEdit = (todo: Todo): void => {
    setEditingTodo(todo);
  };

  // handleUpdateTodo - PUT /api/todos/:id
  const handleUpdateTodo = async (
    id: string,
    newTitle: string,
    newDueDate: string | null,
    newPriority: "low" | "medium" | "high",
    newTags: string[],
  ): Promise<void> => {
    try {
      const token = localStorage.getItem("token");

      const body: UpdateTodoRequest = {
        title: newTitle,
        dueDate: newDueDate,
        priority: newPriority,
        tags: newTags,
      };

      const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Ağ hatası");
      }

      setEditingTodo(null); // Modal'ı kapat
      fetchTodos(); // Todoları yenile
    } catch (error) {
      setError((error as Error).message);
    }
  };

  // handleDeleteAll - Tüm todoları sil
  const handleDeleteAll = async (): Promise<void> => {
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
      setError((error as Error).message);
    }
  };

  // handleDeleteCompleted - Sadece tamamlananları sil
  const handleDeleteCompleted = async (): Promise<void> => {
    const completedTodos: Todo[] = todos.filter((todo) => todo.completed);

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
      setError((error as Error).message);
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
      {/* Toaster Container */}
      <Toaster />

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

          {/* Statistics */}
          {!loading && <Statistics todos={todos} />}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {/* Add Task Form */}
          <AddTaskForm
            value={newTodo}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setNewTodo(e.target.value)}
            onSubmit={handleAddTodo}
            dueDate={dueDate}
            onDateChange={(e: ChangeEvent<HTMLInputElement>) => setDueDate(e.target.value)}
            priority={priority}
            onPriorityChange={(e: ChangeEvent<HTMLSelectElement>) => setPriority(e.target.value as "low" | "medium" | "high")}
            tags={tags}
            onTagsChange={(e: ChangeEvent<HTMLInputElement>) => setTags(e.target.value)}
          />

          {/* Search Input */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="🔍 Search todos..."
              value={searchQuery}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
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
