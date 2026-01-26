// ========================================
// TYPE IMPORTS
// ========================================
import { ChangeEvent, KeyboardEvent } from "react";

// ========================================
// PROPS INTERFACE
// ========================================
interface AddTaskFormProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  dueDate: string;
  onDateChange: (e: ChangeEvent<HTMLInputElement>) => void;
  priority: "low" | "medium" | "high";
  onPriorityChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  tags: string;
  onTagsChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

// ========================================
// COMPONENT
// ========================================
function AddTaskForm({
  value,
  onChange,
  onSubmit,
  dueDate,
  onDateChange,
  priority,
  onPriorityChange,
  tags,
  onTagsChange,
}: AddTaskFormProps) {
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
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
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

        {/* İkinci satır: Tags Input */}
        <div className="flex items-center gap-2 pl-10">
          <span className="text-gray-500 text-sm">🏷️ Tags:</span>
          <input
            type="text"
            value={tags}
            onChange={onTagsChange}
            placeholder="Work, Urgent, Personal..."
            className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}

export default AddTaskForm;