import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateTask from "./pages/CreateTask";
import CreateProject from "./pages/CreateProject";
import Signup from "./pages/Signup";


function App() {
  return (
    <BrowserRouter>
      <Routes>
  <Route path="/" element={<Login />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/create-task" element={<CreateTask />} />
  <Route path="/create-project" element={<CreateProject />} />  {/* ADD THIS */}
  <Route path="/signup" element={<Signup />} />
</Routes>
    </BrowserRouter>
  );
}

export default App;