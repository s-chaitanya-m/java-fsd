import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getTasks,
  createTask,
  updateTaskStatus,
  updateTask,
  deleteTask,
} from "../api/task";
import TaskForm from "../components/TaskForm";
import usePermission from "../hooks/usePermission";
import { getProject } from "../api/projects";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [project, setProject] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const { can } = usePermission();

  const fetchTasks = async () => {
    const res = await getTasks(projectId);
    setTasks(res.data);
  };
  const fetchProject = async () => {
    const res = await getProject(projectId);
    setProject(res.data);
  };

  useEffect(() => {
    fetchTasks();
    fetchProject();
  }, []);

  const handleCreate = async (form) => {
    await createTask({
      ...form,
      projectId: Number(projectId),
    });
    setShowForm(false);
    fetchTasks();
  };

  const handleStatusChange = async (id, status) => {
    await updateTaskStatus(id, status);
    fetchTasks();
  };

  const handleUpdateTask = async (id, data) => {
    await updateTask(id, data);
    setEditingTask(null);
    fetchTasks();
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm("Delete task?")) return;
    await deleteTask(id);
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
      {/* Project Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          {project?.name}
        </h1>

        <p className="text-slate-600 mt-3">
          {project?.description}
        </p>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-slate-800">
          Tasks
        </h2>

        {can("TASK", "CREATE") && (
          <button
            onClick={() => setShowForm(true)}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition"
          >
            + Create Task
          </button>
        )}
      </div>

      {/* Create Form */}
      {showForm && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm mb-6">
          <TaskForm onSubmit={handleCreate} />
        </div>
      )}

      {/* Edit Form */}
      {editingTask && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm mb-6">
          <TaskForm
            initialData={editingTask}
            onSubmit={(data) =>
              handleUpdateTask(editingTask.id, data)
            }
          />
        </div>
      )}

      {/* Empty State */}
      {tasks.length === 0 ? (
        <div className="bg-white border border-dashed border-slate-300 rounded-xl p-12 text-center">
          <div className="text-5xl mb-4">📝</div>

          <h3 className="text-xl font-semibold text-slate-700">
            No Tasks Yet
          </h3>

          <p className="text-slate-500 mt-2">
            Create your first task for this project.
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
                  <h3 className="text-lg font-semibold text-slate-800">
                    {task.description}
                  </h3>

                  <span
                    className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      task.status
                    )}`}
                  >
                    {task.status}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {can("TASK", "COMPLETE") &&
                    task.status !== "COMPLETED" && (
                      <button
                        onClick={() =>
                          handleStatusChange(
                            task.id,
                            "COMPLETED"
                          )
                        }
                        className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm"
                      >
                        Complete
                      </button>
                    )}

                  {can("TASK", "ASSIGN") && (
                    <button
                      onClick={() =>
                        handleStatusChange(
                          task.id,
                          "IN_PROGRESS"
                        )
                      }
                      className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
                    >
                      Start
                    </button>
                  )}

                  {can("TASK", "UPDATE") && (
                    <button
                      onClick={() => setEditingTask(task)}
                      className="px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm"
                    >
                      Edit
                    </button>
                  )}

                  {can("TASK", "DELETE") && (
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm"
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
};

export default ProjectDetails;
