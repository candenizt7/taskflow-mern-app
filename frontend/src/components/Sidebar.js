function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      {/* Logo/Başlık */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">TaskFlow</h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          <div className="text-xs text-gray-500 uppercase font-semibold mb-2 px-2">
            Workspace
          </div>

          <a className="flex items-center gap-3 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium">
            <span>📝</span>
            <span>My Tasks</span>
          </a>

          <a className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
            <span>👥</span>
            <span>Team</span>
          </a>

          <a className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
            <span>⚙️</span>
            <span>Settings</span>
          </a>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;