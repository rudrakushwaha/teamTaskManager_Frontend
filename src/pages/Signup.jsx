import { useState } from "react";
import axios from "axios";
import  BASE_URL  from "../api";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("member");

  const handleSignup = async () => {
    await axios.post(`${BASE_URL}/api/auth/signup`, {
      name,
      email,
      password,
      role
    });

    alert("User created");
    window.location.href = "/";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md border w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Team Task Manager</h1>
        <p className="text-center text-gray-600 mb-6">Create your account</p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              className="w-full p-3 border rounded"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              className="w-full p-3 border rounded"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              className="w-full p-3 border rounded"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Role</label>
            <select
              className="w-full p-3 border rounded"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600"
            onClick={handleSignup}
          >
            Signup
          </button>
        </div>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <a href="/" className="text-blue-500 hover:text-blue-600">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;