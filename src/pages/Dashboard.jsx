import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import  BASE_URL  from "../api";

function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const token = localStorage.getItem("token");
  const user = jwtDecode(token);

  useEffect(() => {
  axios.get(`${BASE_URL}/api/tasks`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(res => {
    const allTasks = res.data;

    //FILTER LOGIC
    if (user.role === "member") {
      const filteredTasks = allTasks.filter(
        task => task.assignedTo?._id === user.id
      );
      setTasks(filteredTasks);
    } else {
      setTasks(allTasks);
    }
  });
}, []);

  const isOverdue = (task) => {
  return new Date(task.dueDate) < new Date() && task.status !== "done";
};


    const handleStatusChange = async (taskId, newStatus) => {
    try {
        await axios.patch(
        `${BASE_URL}/api/tasks/${taskId}`,
        { status: newStatus },
        {
            headers: { Authorization: `Bearer ${token}` }
        }
        );

        // update UI instantly
        setTasks(prev =>
        prev.map(task =>
            task._id === taskId ? { ...task, status: newStatus } : task
        )
        );

    } catch (err) {
        console.error(err);
    }
    };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Team Task Manager</h1>
          <div className="flex space-x-4">
            {user.role === "admin" && (
            <a href="/create-task" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Create Task
            </a>
            )}
            {user.role === "admin" && (
                <a href="/create-project" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                    Create Project
                </a>
)}
            <button
  onClick={() => {
    localStorage.removeItem("token");
    window.location.href = "/";
  }}
  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
>
  Logout
</button>
          </div>
        </div>
      </div>

      {/* Tasks */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
        
        {tasks.length === 0 ? (
          <div className="bg-white p-8 rounded shadow text-center">
            <p className="text-gray-500 mb-4">No tasks found</p>
            <a href="/create-task" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Create your first task
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.map(task => (
              <div
   key={task._id}
   className={`bg-white p-4 rounded shadow border ${
     isOverdue(task) ? "border-red-500" : ""
   }`}
 >
                <h3 className="font-semibold mb-2">{task.title}</h3>
                <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task._id, e.target.value)}
                    className="border p-1 mt-1"
                    >
                    <option value="todo">Todo</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                </select>
                {task.assignedTo?.name && (
                  <p className="text-sm text-gray-600 mb-1">Assigned: {task.assignedTo.name}</p>
                )}
                {task.project?.name && (
                  <p className="text-sm text-gray-600">Project: {task.project.name}</p>
                )}

                {isOverdue(task) && (
      <p className="text-red-500 font-semibold mt-2">
        Overdue
      </p>
    )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;