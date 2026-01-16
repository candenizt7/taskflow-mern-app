import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    // Loading başlat
    setLoading(true);
    setError("");

    // Backend'e istek at
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    // Response'u oku
    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem('userName', data.user.name);
      navigate("/todos");
    } else {
      setError(data.error);
    }

    // Loading bitir
    setLoading(false);
  };

  return (
  <div className="flex min-h-screen">
    {/* Left Side - Brand/Visual */}
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 p-12 text-white flex-col justify-between">
      {/* Logo & Title */}
      <div>
        <h1 className="text-4xl font-bold mb-4">TaskFlow</h1>
        <div className="w-20 h-1 bg-white/30 rounded"></div>
      </div>
      
      {/* Features */}
      <div className="space-y-8">
        <div>
          <div className="text-5xl mb-4">✨</div>
          <h2 className="text-2xl font-semibold mb-2">Organize your work</h2>
          <p className="text-blue-100">Keep track of all your tasks in one beautiful place</p>
        </div>
        
        <div>
          <div className="text-5xl mb-4">🚀</div>
          <h2 className="text-2xl font-semibold mb-2">Boost productivity</h2>
          <p className="text-blue-100">Get more done with intuitive task management</p>
        </div>
        
        <div>
          <div className="text-5xl mb-4">💼</div>
          <h2 className="text-2xl font-semibold mb-2">Work together</h2>
          <p className="text-blue-100">Collaborate with your team seamlessly</p>
        </div>
      </div>
      
      {/* Footer */}
      <div className="text-blue-100 text-sm">
        © 2025 TaskFlow. Built with ❤️
      </div>
    </div>
    
    {/* Right Side - Form */}
    <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
      <div className="w-full max-w-md">
        {/* Form Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome back!</h2>
          <p className="text-gray-500">Sign in to continue to TaskFlow</p>
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}
        
        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            
            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleLogin();
                  }
                }}
              />
            </div>
            
            {/* Forgot Password Link */}
            <div className="text-right">
              <a href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
                Forgot password?
              </a>
            </div>
            
            {/* Login Button */}
            <button
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </div>
        
        {/* Sign Up Link */}
        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 font-semibold hover:text-blue-700">
            Sign up
          </a>
        </p>
      </div>
    </div>
  </div>
);
}

export default Login;
