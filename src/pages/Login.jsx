import { useState } from "react";
import axios from "axios";
import  BASE_URL  from "../api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await axios.post(`${BASE_URL}/api/auth/login`, {
      email,
      password
    });

    localStorage.setItem("token", res.data.token);
    window.location.href = "/dashboard";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md border w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Team Task Manager</h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              className="w-full p-3 border rounded"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              className="w-full p-3 border rounded"
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
        <p className="mt-3">
  Don't have an account?{" "}
  <a href="/signup" className="text-blue-500">
    Signup
  </a>
</p>
      </div>
    </div>
  );
}

export default Login;