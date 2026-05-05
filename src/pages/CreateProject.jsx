import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../api";


function CreateProject() {
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [members, setMembers] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get(`${BASE_URL}/api/auth/users`)
      .then(res => setUsers(res.data));
  }, []);

  const handleSubmit = async () => {
    await axios.post(`${BASE_URL}/api/projects`, {
      name,
      members
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    alert("Project Created");
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <div className="flex items-center">
          <a href="/dashboard" className="text-gray-600 mr-4">← Back</a>
          <h1 className="text-xl font-bold">Create New Project</h1>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white p-6 rounded shadow max-w-2xl">
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-4">
          {/* Project Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Project Name</label>
            <input
              type="text"
              className="w-full p-3 border rounded"
              placeholder="Enter project name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Team Members */}
          <div>
            <label className="block text-sm font-medium mb-2">Team Members</label>
            <div className="border rounded p-3 bg-gray-50">
              <select
                multiple
                onChange={(e) => {
                  const selected = [...e.target.selectedOptions].map(o => o.value);
                  setMembers(selected);
                }}
                className="w-full p-2 border rounded bg-white"
                size="4"
              >
                {users.map(user => (
                  <option key={user._id} value={user._id}>
                    {user.name}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-2">Hold Ctrl to select multiple</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4 pt-4 border-t">
            <a href="/dashboard" className="px-4 py-2 border rounded hover:bg-gray-50">
              Cancel
            </a>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProject;