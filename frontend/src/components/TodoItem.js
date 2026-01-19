function TodoItem({ todo, onToggle, onDelete, onEdit }) {
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
