import { useEffect, useState } from "react";
import axios from "axios";
import  BASE_URL  from "../api";

function CreateTask() {
  const [title, setTitle] = useState("");
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [assignedTo, setAssignedTo] = useState("");
  const [project, setProject] = useState("");
  const [dueDate, setDueDate] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    // fetch users
    axios.get(`${BASE_URL}/api/auth/users`)
      .then(res => setUsers(res.data));

    // fetch projects
    axios.get(`${BASE_URL}/api/projects`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setProjects(res.data));
  }, []);

  const handleSubmit = async () => {
    await axios.post(`${BASE_URL}/api/tasks`, {
      title,
      assignedTo,
      project,
      dueDate
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    alert("Task Created");
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <div className="flex items-center">
          <a href="/dashboard" className="text-gray-600 mr-4">← Back</a>
          <h1 className="text-xl font-bold">Create New Task</h1>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white p-6 rounded shadow max-w-2xl">
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-4">
          {/* Task Title */}
          <div>
            <label className="block text-sm font-medium mb-2">Task Title</label>
            <input
              type="text"
              className="w-full p-3 border rounded"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Assigned User */}
          <div>
            <label className="block text-sm font-medium mb-2">Assigned To</label>
            <select
              className="w-full p-3 border rounded"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              required
            >
              <option value="">Select a user</option>
              {users.map(user => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          {/* Project */}
          <div>
            <label className="block text-sm font-medium mb-2">Project</label>
            <select
              className="w-full p-3 border rounded"
              value={project}
              onChange={(e) => setProject(e.target.value)}
              required
            >
              <option value="">Select a project</option>
              {projects.map(p => (
                <option key={p._id} value={p._id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium mb-2">Due Date (Optional)</label>
            <input
              type="date"
              className="w-full p-3 border rounded"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4 pt-4 border-t">
            <a href="/dashboard" className="px-4 py-2 border rounded hover:bg-gray-50">
              Cancel
            </a>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTask;