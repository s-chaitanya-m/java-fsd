import React, { useEffect, useState } from "react";
import usePermission from "../hooks/usePermission";
import {
  deleteTask,
  getUserTasks,
  updateTaskStatus,
} from "../api/task";

function Home() {
  const [tasks, setTasks] = useState([]);
  const { can } = usePermission();

  const fetchTasks = async () => {
    try {
      const res = await getUserTasks();
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleComplete = async (taskId) => {
    await updateTaskStatus(taskId, "COMPLETED");
    fetchTasks();
  };

  const handleDelete = async (taskId) => {
    await deleteTask(taskId);
    fetchTasks();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "COMPLETED":
        return "bg-emerald-100 text-emerald-700";
      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-700";
      case "PENDING":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          My Tasks
        </h1>
        <p className="text-slate-500 mt-2">
          Manage and track your assigned tasks.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <h3 className="text-sm text-slate-500">Total Tasks</h3>
          <p className="text-3xl font-bold mt-2">{tasks.length}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <h3 className="text-sm text-slate-500">Completed</h3>
          <p className="text-3xl font-bold mt-2">
            {tasks.filter((t) => t.status === "COMPLETED").length}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <h3 className="text-sm text-slate-500">Pending</h3>
          <p className="text-3xl font-bold mt-2">
            {tasks.filter((t) => t.status !== "COMPLETED").length}
          </p>
        </div>
      </div>

      {/* Task Cards */}
      {tasks.length === 0 ? (
        <div className="bg-white border border-dashed border-slate-300 rounded-xl p-12 text-center">
          <div className="text-5xl mb-4">📋</div>
          <h3 className="text-xl font-semibold text-slate-700">
            No Tasks Found
          </h3>
          <p className="text-slate-500 mt-2">
            Tasks assigned to you will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-lg text-slate-800">
                    {task.description}
                  </h3>

                  <p className="text-sm text-slate-500 mt-2">
                    Due: {task.dueDate}
                  </p>

                  <span
                    className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      task.status
                    )}`}
                  >
                    {task.status}
                  </span>
                </div>

                <div className="flex gap-2">
                  {can("TASK", "COMPLETE") &&
                    task.status !== "COMPLETED" && (
                      <button
                        onClick={() => handleComplete(task.id)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition"
                      >
                        Complete
                      </button>
                    )}

                  {can("TASK", "DELETE") && (
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;