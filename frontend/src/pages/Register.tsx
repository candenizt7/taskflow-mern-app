// ========================================
// TYPE IMPORTS
// ========================================
import { useState, ChangeEvent, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";

// ========================================
// INTERFACE - API Response
// ========================================
interface RegisterResponse {
  token: string;
  user: {
    name: string;
    email: string;
  };
}

interface ErrorResponse {
  error: string;
}

// ========================================
// COMPONENT
// ========================================
function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleRegister = async (): Promise<void> => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data: RegisterResponse | ErrorResponse = await response.json();

      if (response.ok) {
        const registerData = data as RegisterResponse;
        localStorage.setItem("token", registerData.token);
        localStorage.setItem("userName", registerData.user.name);
        navigate("/todos");
      } else {
        const errorData = data as ErrorResponse;
        setError(errorData.error);
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Brand/Visual */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 p-12 text-white flex-col justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-4">TaskFlow</h1>
          <div className="w-20 h-1 bg-white/30 rounded"></div>
        </div>

        <div className="space-y-8">
          <div>
            <div className="text-5xl mb-4">✨</div>
            <h2 className="text-2xl font-semibold mb-2">Get started today</h2>
            <p className="text-blue-100">
              Join thousands of users organizing their work
            </p>
          </div>

          <div>
            <div className="text-5xl mb-4">🚀</div>
            <h2 className="text-2xl font-semibold mb-2">Free to start</h2>
            <p className="text-blue-100">
              No credit card required. Start managing tasks instantly
            </p>
          </div>

          <div>
            <div className="text-5xl mb-4">💼</div>
            <h2 className="text-2xl font-semibold mb-2">Team ready</h2>
            <p className="text-blue-100">
              Perfect for individuals and growing teams
            </p>
          </div>
        </div>

        <div className="text-blue-100 text-sm">
          © 2025 TaskFlow. Built with ❤️
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Create account
            </h2>
            <p className="text-gray-500">Start organizing your tasks today</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  type="text"
                  value={name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                  }
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  type="email"
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  type="password"
                  value={password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                  placeholder="••••••••"
                  onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === "Enter") {
                      handleRegister();
                    }
                  }}
                />
                <p className="text-xs text-gray-500 mt-1">
                  At least 6 characters
                </p>
              </div>

              <button
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                onClick={handleRegister}
                disabled={loading}
              >
                {loading ? "Creating account..." : "Sign up"}
              </button>
            </div>
          </div>

          <p className="text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-600 font-semibold hover:text-blue-700"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;