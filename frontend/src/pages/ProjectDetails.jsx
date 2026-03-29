import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTasks, createTask, updateTaskStatus } from "../api/task";
import TaskForm from "../components/TaskForm";
import usePermission from "../hooks/usePermission";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const { can } = usePermission();

  const fetchTasks = async () => {
    const res = await getTasks(projectId);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
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

  return (
    <div>
      <h2>Tasks</h2>

      {can("TASK", "CREATE") && (
        <button onClick={() => setShowForm(true)}>Create Task</button>
      )}

      {showForm && <TaskForm onSubmit={handleCreate} />}

      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            {t.description} - {t.status}
            {can("TASK", "COMPLETE") && (
              <button onClick={() => handleStatusChange(t.id, "COMPLETED")}>
                Mark Complete
              </button>
            )}
            {can("TASK", "ASSIGN") && (
              <button onClick={() => handleStatusChange(t.id, "IN_PROGRESS")}>
                Start
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectDetails;
