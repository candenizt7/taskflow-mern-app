// ========================================
// TYPE IMPORTS
// ========================================
import { useNavigate } from "react-router-dom";

// ========================================
// COMPONENT - NO PROPS!
// ========================================
function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">TaskFlow</h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Organize Your Work,
            <br />
            <span className="text-blue-600">Boost Your Productivity</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            TaskFlow helps you manage tasks efficiently. Stay organized,
            collaborate with your team, and get more done.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate("/register")}
              className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              Get Started Free →
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-4 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-lg border-2 border-gray-300"
            >
              Login
            </button>
          </div>
          <div className="mt-16 text-6xl">✨ 🚀 💼</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything you need to stay organized
          </h2>
          <p className="text-xl text-gray-600">
            Powerful features to help you manage your tasks efficiently
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
            <div className="text-5xl mb-4">✨</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Simple & Intuitive
            </h3>
            <p className="text-gray-600">
              Clean interface that's easy to use. Add, complete, and organize
              tasks in seconds.
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
            <div className="text-5xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Boost Productivity
            </h3>
            <p className="text-gray-600">
              Stay focused and get more done. Track your progress and never miss
              a deadline.
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
            <div className="text-5xl mb-4">💼</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Team Ready
            </h3>
            <p className="text-gray-600">
              Perfect for individuals and teams. Collaborate seamlessly and
              achieve your goals together.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">TaskFlow</h3>
              <p className="text-gray-400">© 2025 TaskFlow. Built with ❤️</p>
            </div>
            <div className="flex gap-8">
              <button
                onClick={() => navigate("/login")}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Sign Up
              </button>
              <a
                href="https://github.com/candenizt7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;