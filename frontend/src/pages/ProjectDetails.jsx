import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTasks, createTask, updateTaskStatus } from "../api/tasks";
import TaskForm from "../components/TaskForm";
import { usePermission } from "../hooks/usePermission";
import { RESOURCES, ACTIONS } from "../auth/permissions";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const { can } = usePermission();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await getTasks(projectId);
    setTasks(res.data);
  };

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

      {can(RESOURCES.TASK, ACTIONS.CREATE) && (
        <button onClick={() => setShowForm(true)}>
          Create Task
        </button>
      )}

      {showForm && <TaskForm onSubmit={handleCreate} />}

      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            {t.description} - {t.status}

            {can(RESOURCES.TASK, ACTIONS.COMPLETE) && (
              <button onClick={() => handleStatusChange(t.id, "COMPLETED")}>
                Mark Complete
              </button>
            )}

            {can(RESOURCES.TASK, ACTIONS.ASSIGN) && (
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