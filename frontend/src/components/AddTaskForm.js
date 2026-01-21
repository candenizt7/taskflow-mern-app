function AddTaskForm({ value, onChange, onSubmit, dueDate, onDateChange, priority, onPriorityChange }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex items-center gap-3">
        {/* Plus Icon */}
        <span className="text-2xl text-gray-400">➕</span>
        {/* Input */}
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Add new task..."
          className="flex-1 outline-none text-gray-700 placeholder-gray-400 text-base"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSubmit();
            }
          }}
        />

         {/* Priority Dropdown */}
        <select
          value={priority}
          onChange={onPriorityChange}
          className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="low">🟢 Low</option>
          <option value="medium">🟡 Medium</option>
          <option value="high">🔴 High</option>
        </select>

        {/* Date Input */}
        <input
          type="date"
          value={dueDate}
          onChange={onDateChange}
          className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Add Button */}
        <button
          onClick={onSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default AddTaskForm;
