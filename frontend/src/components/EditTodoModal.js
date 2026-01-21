import { useState } from "react";

function EditTodoModal({ todo, onClose, onSave }) {
  const [title, setTitle] = useState(todo.title); // Mevcut title'ı göster

  // dueDate'i formatla (ISO string → YYYY-MM-DD)
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // "2026-01-22"
  };

  const [dueDate, setDueDate] = useState(formatDateForInput(todo.dueDate));

  const handleSave = () => {
    if (title.trim().length < 3) {
      alert("Başlık en az 3 karakter olmalı!");
      return;
    }
    onSave(todo._id, title, dueDate || null); // Parent'a bildir
  };

  return (
    // Overlay - Arka plan (karartma)
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose} // Arka plana tıklayınca kapat
    >
      {/* Modal Box */}
      <div
        className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl"
        onClick={(e) => e.stopPropagation()} // Modal'a tıklayınca kapanmasın
      >
        {/* Header */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit Task</h2>

        {/* Input */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          placeholder="Task title..."
          autoFocus
        />

        {/* Date Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Due Date (optional)
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-2 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditTodoModal;
