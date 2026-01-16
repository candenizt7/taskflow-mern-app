function AddTaskForm({ value, onChange, onSubmit }) {
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
              if (e.key === 'Enter') {
                onSubmit();
              }
            }}
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