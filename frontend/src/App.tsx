import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import "./App.css";
import Register from "./pages/Register";
import Todos from "./pages/Todos";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./pages/Landing";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <div>
              <h1>Home Sayfası</h1>
            </div>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/todos"
          element={
            <ProtectedRoute>
              <Todos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <div>
              <h1>Şifremi Unuttum</h1>
            </div>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            <div>
              <h1>Şifre Yenileme</h1>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;