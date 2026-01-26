// ========================================
// TYPE IMPORTS
// ========================================
import { Todo } from '../types/todo.types';

// ========================================
// INTERFACE - DateInfo (formatDate return)
// ========================================
interface DateInfo {
  formattedDate: string;
  colorClass: string;
}

// ========================================
// INTERFACE - PriorityInfo (getPriorityInfo return)
// ========================================
interface PriorityInfo {
  label: string;
  emoji: string;
  colorClass: string;
}

// ========================================
// PROPS INTERFACE
// ========================================
interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
}

// ========================================
// COMPONENT
// ========================================
function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  // Tarih formatla ve renk belirle
  const formatDate = (dateString: string): DateInfo | null => {
    if (!dateString) return null;

    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todoDate = new Date(date);
    todoDate.setHours(0, 0, 0, 0);

    // Tarih farkı (gün olarak)
    const diffTime = todoDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Renk belirleme
    let colorClass = "";
    if (diffDays < 0) {
      colorClass = "bg-red-100 text-red-700"; // Geçmiş - KIRMIZI
    } else if (diffDays === 0) {
      colorClass = "bg-orange-100 text-orange-700"; // Bugün - TURUNCU
    } else if (diffDays <= 2) {
      colorClass = "bg-yellow-100 text-yellow-700"; // 1-2 gün - SARI
    } else {
      colorClass = "bg-gray-100 text-gray-700"; // Gelecek - GRİ
    }

    // Tarih formatla (Jan 22, 2026)
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    return { formattedDate, colorClass };
  };

  // Priority formatla ve renk belirle
  const getPriorityInfo = (priority: string): PriorityInfo | null => {
    if (!priority) return null;

    const priorityMap: Record<string, PriorityInfo> = {
      low: {
        label: "Low",
        emoji: "🟢",
        colorClass: "bg-green-100 text-green-700",
      },
      medium: {
        label: "Medium",
        emoji: "🟡",
        colorClass: "bg-yellow-100 text-yellow-700",
      },
      high: {
        label: "High",
        emoji: "🔴",
        colorClass: "bg-red-100 text-red-700",
      },
    };

    return priorityMap[priority] || null;
  };

  const dateInfo = todo.dueDate ? formatDate(todo.dueDate) : null;
  const priorityInfo = todo.priority ? getPriorityInfo(todo.priority) : null;

   return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo._id, todo.completed)}
          className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
        />

        {/* Title */}
        <span
          className={`flex-1 text-gray-800 ${todo.completed ? "line-through text-gray-400" : ""}`}
        >
          {todo.title}
        </span>

        {/* Due Date Badge */}
        {dateInfo && (
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${dateInfo.colorClass}`}
          >
            📅 {dateInfo.formattedDate}
          </span>
        )}

        {/* Priority Badge */}
        {priorityInfo && (
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${priorityInfo.colorClass}`}
          >
            {priorityInfo.emoji} {priorityInfo.label}
          </span>
        )}

        {/* Tags Badges */}
        {todo.tags && todo.tags.length > 0 && (
          <div className="flex gap-1">
            {todo.tags.map((tag: string, index: number) => (
              <span
                key={index}
                className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Status Badge */}
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            todo.completed
              ? "bg-green-100 text-green-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {todo.completed ? "✓ Done" : "Working on it"}
        </span>

        {/* Edit Button */}
        <button
          onClick={() => onEdit(todo)}
          className="text-gray-400 hover:text-blue-500 transition-colors"
        >
          ✏️
        </button>

        {/* Delete Button */}
        <button
          onClick={() => onDelete(todo._id)}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

export default TodoItem;