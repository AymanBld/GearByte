import { useEffect, useState } from "react";
import { Plus, Trash, Eye } from "lucide-react";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", category: "", dueDate: "", status: "Pending" });
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (!newTask.title || !newTask.category || !newTask.dueDate) {
      alert("Please fill in all fields!");
      return;
    }

    const updatedTasks = [...tasks, { id: tasks.length + 1, ...newTask }];
    setTasks(updatedTasks);
    setNewTask({ title: "", category: "", dueDate: "", status: "Pending" });
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleStatusChange = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status: task.status === "Completed" ? "Pending" : "Completed" } : task
      )
    );
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-black mb-6 text-center">E-commerce Task Manager</h2>

      {/* Add Task Section */}
      <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-3">Add New Task</h3>
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            placeholder="Task Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="p-3 text-lg border rounded-lg w-full"
          />
          <input
            type="text"
            placeholder="Category (e.g., Orders, Inventory)"
            value={newTask.category}
            onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
            className="p-3 text-lg border rounded-lg w-full"
          />
          <input
            type="date"
            value={newTask.dueDate}
            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
            className="p-3 text-lg border rounded-lg w-full"
          />
        </div>
        <button
          onClick={handleAddTask}
          className="mt-4 bg-[#EA3C3C] text-white px-4 py-3 text-lg rounded-lg shadow-md hover:bg-red-700 transition flex items-center w-full"
        >
          <Plus size={22} className="mr-2" />
          Add Task
        </button>
      </div>

      {/* Task List Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-[#EA3C3C] text-white">
            <tr>
              <th className="p-4 text-lg">ID</th>
              <th className="p-4 text-lg">Title</th>
              <th className="p-4 text-lg">Category</th>
              <th className="p-4 text-lg">Due Date</th>
              <th className="p-4 text-lg">Status</th>
              <th className="p-4 text-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500 text-lg">
                  No tasks available.
                </td>
              </tr>
            ) : (
              tasks.map((task, index) => (
                <tr
                  key={task.id}
                  className={`border-b hover:bg-gray-100 transition ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                >
                  <td className="p-4 text-lg">{task.id}</td>
                  <td className="p-4 text-lg">{task.title}</td>
                  <td className="p-4 text-lg">{task.category}</td>
                  <td className="p-4 text-lg">{task.dueDate}</td>
                  <td className="p-4 text-lg">
                    <button
                      onClick={() => handleStatusChange(task.id)}
                      className={`px-3 py-2 text-lg rounded-lg text-white ${
                        task.status === "Completed" ? "bg-green-500" : "bg-gray-500"
                      }`}
                    >
                      {task.status}
                    </button>
                  </td>
                  <td className="p-4 flex items-center space-x-3">
                    <button onClick={() => setSelectedTask(task)} className="text-blue-500 hover:text-blue-700">
                      <Eye size={26} />
                    </button>
                    <button onClick={() => handleDeleteTask(task.id)} className="text-red-500 hover:text-red-700">
                      <Trash size={26} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Task Details Modal */}
      {selectedTask && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-10 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-xl font-bold mb-4 text-[#EA3C3C]">Task Details</h3>
            <p className="mb-2">
              <strong>Title:</strong> {selectedTask.title}
            </p>
            <p className="mb-2">
              <strong>Category:</strong> {selectedTask.category}
            </p>
            <p className="mb-2">
              <strong>Due Date:</strong> {selectedTask.dueDate}
            </p>
            <p className="mb-2">
              <strong>Status:</strong> {selectedTask.status}
            </p>
            <button onClick={() => setSelectedTask(null)} className="mt-4 bg-gray-500 text-white px-4 py-3 text-lg rounded-lg w-full hover:bg-gray-700 transition">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskManager;
