// 1. PROPS INTERFACE TANIMLA
interface EmptyStateProps {
  filter: 'all' | 'active' | 'completed'; // Sadece bu 3 değer
}

// 2. MESSAGE TYPE TANIMLA (getMessage'ın döndüreceği obje)
interface EmptyMessage {
  emoji: string;
  title: string;
  description: string;
}

// 3. COMPONENT TANIMLA
function EmptyState({ filter }: EmptyStateProps) {
  // getMessage fonksiyonuna return type ekle
  const getMessage = (): EmptyMessage => {
    if (filter === "active") {
      return {
        emoji: "🎉",
        title: "No active tasks!",
        description: "Great job! All tasks are completed or you can add new ones.",
      };
    }
    
    if (filter === "completed") {
      return {
        emoji: "✅",
        title: "No completed tasks yet",
        description: "Start checking off your tasks to see them here!",
      };
    }
    
    // filter === "all"
    return {
      emoji: "✨",
      title: "No tasks yet!",
      description: "Start organizing your work by adding your first task",
    };
  };

  const message: EmptyMessage = getMessage();

  return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">{message.emoji}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {message.title}
      </h3>
      <p className="text-gray-500">
        {message.description}
      </p>
      <p className="text-gray-400 text-sm mt-4">
        📝→✅→🎉
      </p>
    </div>
  );
}

export default EmptyState;