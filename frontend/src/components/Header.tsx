
// ========================================
// PROPS INTERFACE
// ========================================
interface HeaderProps {
  userName: string | null; // localStorage'dan geliyor, null olabilir
  onLogout: () => void;   // Logout fonksiyonu
}


// ========================================
// COMPONENT
// ========================================
function Header({ userName, onLogout }: HeaderProps) {
  return (
    <div className="mb-8 flex items-start justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Tasks</h1>
        <p className="text-gray-500">Manage your daily tasks efficiently</p>
      </div>
      
      {/* User Section */}
      <div className="flex items-center gap-3">
        {/* User Avatar & Name */}
        <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow cursor-pointer">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
            {userName?.charAt(0).toUpperCase() || 'U'}
          </div>
          <span className="text-gray-700 font-medium">
            {userName || 'User'}
          </span>
        </div>
        
        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Header;