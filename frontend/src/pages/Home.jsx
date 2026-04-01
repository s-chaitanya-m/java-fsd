import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
// import { tasks } from "../constants/taskData";
import usePermission from "../hooks/usePermission";
import {
  deleteTask,
  getTask,
  getTasks,
  getUserTasks,
  updateTaskStatus,
} from "../api/task";

function Home() {
  const [tasks, setTasks] = useState([]);

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

  const { user, logout } = useContext(AuthContext);
  const { can } = usePermission();
  return (
    <div>
      <h1>Welcome {user?.name}</h1>
      <button onClick={() => logout()}>Logout</button>
      <h2>Tasks</h2>
      <table>
        <tr>
          <th>Task</th>
          <th>Due On</th>
          <th>Status</th>
        </tr>
        {tasks.map((t) => (
          <tr key={t.id}>
            <td>{t.description}</td>
            <td>{t.dueDate}</td>
            <td>{t.status}</td>
            <td>
              <button
                onClick={() => getTask(t.id)}
                disabled={!can("TASK", "READ")}
              >
                V
              </button>
              <button
                onClick={() => updateTaskStatus(t.id, "COMPLETED")}
                disabled={!can("TASK", "UPDATE")}
              >
                E
              </button>
              <button
                onClick={() => deleteTask(t.id)}
                disabled={!can("TASK", "DELETE")}
              >
                D
              </button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default Home;
