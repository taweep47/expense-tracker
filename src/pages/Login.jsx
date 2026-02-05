import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { login as loginApi } from "../auth/authService";
import { useAuth } from "../auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      const { user, token } = await loginApi(email, password);
      auth.login(user, token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-slate-800">
            Welcome back
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Sign in to your expense dashboard
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 rounded-md bg-red-50 text-red-600 text-sm px-3 py-2">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="text-sm text-slate-600">Email</label>
            <div className="relative mt-1">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-slate-900"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-slate-600">Password</label>
            <div className="relative mt-1">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2 border border-slate-300 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-slate-900"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-slate-900 text-white py-2 rounded-lg
              hover:bg-slate-800 transition font-medium"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-slate-500">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-slate-900 font-medium hover:underline"
          >
            Register
          </Link>
          <div className="mt-3">
            Demo account:
            <br />
            <span className="font-medium">test@test.com</span> /{" "}
            <span className="font-medium">1234</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
