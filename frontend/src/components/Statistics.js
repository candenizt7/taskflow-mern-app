function Statistics({ todos }) {
    //Hesaplamalar
    const totalTodos = todos.length;
    const completedTodos = todos.filter(todo => todo.completed).length;
    const activeTodos = totalTodos - completedTodos;
    const completionPercentage = totalTodos > 0 
        ? Math.round((completedTodos / totalTodos) * 100)
        : 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Sadece tarih kısmını karşılaştırmak için saat, dakika, saniye ve milisaniyeyi sıfırla

    const completedToday = todos.filter(todo => {
        if (!todo.completed) return false;

        const updatedAt = new Date(todo.updatedAt);
        updatedAt.setHours(0, 0, 0, 0);

        return updatedAt.getTime() === today.getTime();
    }).length;

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      {/* Header */}
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        📊 Task Statistics
      </h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {/* Total */}
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-800">{totalTodos}</div>
          <div className="text-sm text-gray-500">Total</div>
        </div>

        {/* Completed */}
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{completedTodos}</div>
          <div className="text-sm text-gray-500">Completed</div>
        </div>

        {/* Active */}
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{activeTodos}</div>
          <div className="text-sm text-gray-500">Active</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>{completionPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-green-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Today's Completed */}
      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
        <span className="text-sm font-medium text-gray-700">🎯 Completed Today</span>
        <span className="text-lg font-bold text-blue-600">{completedToday}</span>
      </div>
    </div>
  );
}

export default Statistics;