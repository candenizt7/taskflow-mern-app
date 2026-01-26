// ========================================
// TYPE IMPORTS
// ========================================
import { useState, ChangeEvent, MouseEvent } from "react";
import { Todo } from "../types/todo.types";

// ========================================
// PROPS INTERFACE
// ========================================
interface EditTodoModalProps {
  todo: Todo;
  onClose: () => void;
  onSave: (
    id: string,
    title: string,
    dueDate: string | null,
    priority: "low" | "medium" | "high",
    tags: string[]
  ) => void;
}

// ========================================
// COMPONENT
// ========================================
function EditTodoModal({ todo, onClose, onSave }: EditTodoModalProps) {
  // dueDate'i formatla (ISO string → YYYY-MM-DD)
  const formatDateForInput = (dateString?: string | null): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // "2026-01-22"
  };

  // Tags array'i string'e çevir
  const formatTagsForInput = (tagsArray?: string[]): string => {
    if (!tagsArray || tagsArray.length === 0) return "";
    return tagsArray.join(", "); // ["Work", "Urgent"] → "Work, Urgent"
  };

  const [title, setTitle] = useState<string>(todo.title);
  const [dueDate, setDueDate] = useState<string>(
    formatDateForInput(todo.dueDate)
  );
  const [priority, setPriority] = useState<"low" | "medium" | "high">(
    todo.priority || "medium"
  );
  const [tags, setTags] = useState<string>(formatTagsForInput(todo.tags));

  const handleSave = (): void => {
    if (title.trim().length < 3) {
      alert("Başlık en az 3 karakter olmalı!");
      return;
    }

    // Tags string'i array'e çevir
    const tagsArray: string[] = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    onSave(todo._id, title, dueDate || null, priority, tagsArray);
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
        onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()} // Modal'a tıklayınca kapanmasın
      >
        {/* Header */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit Task</h2>

        {/* Input */}
        <input
          type="text"
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          placeholder="Task title..."
          autoFocus
        />

        {/* Priority Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Priority
          </label>
          <select
            value={priority}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setPriority(e.target.value as "low" | "medium" | "high")
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="low">🟢 Low</option>
            <option value="medium">🟡 Medium</option>
            <option value="high">🔴 High</option>
          </select>
        </div>

        {/* Date Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Due Date (optional)
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setDueDate(e.target.value)
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Tags Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags (optional)
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTags(e.target.value)
            }
            placeholder="Work, Urgent, Personal (comma separated)"
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