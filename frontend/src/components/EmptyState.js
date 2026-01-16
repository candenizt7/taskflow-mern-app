function EmptyState() {
  return (
    <div className="text-center py-16">
      {/* Emoji/Icon */}
      <div className="text-6xl mb-4">✨</div>
      
      {/* Message */}
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        No tasks yet!
      </h3>
      <p className="text-gray-500 mb-6">
        Start organizing your work by adding your first task
      </p>
      
      {/* Visual illustration */}
      <div className="inline-flex items-center gap-2 text-gray-400">
        <span className="text-2xl">📝</span>
        <span>→</span>
        <span className="text-2xl">✅</span>
        <span>→</span>
        <span className="text-2xl">🎉</span>
      </div>
    </div>
  );
}

export default EmptyState;