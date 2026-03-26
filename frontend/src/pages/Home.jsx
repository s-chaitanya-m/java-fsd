import React, { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { tasks } from "../constants/taskData";
import usePermission from "../hooks/usePermission";

function Home() {
  const { user, logout } = useContext(AuthContext);
  const { can } = usePermission();
  return (
    <div>
      <h1>Welcome {user?.name}</h1>
      <button onClick={() => logout()}>Logout</button>
      <table>
        <tr>
          <th>Task</th>
          <th>Due On</th>
          <th>Status</th>
        </tr>
        {tasks.map((t) => (
          <tr>
            <td>{t.name}</td>
            <td>{t.due_on}</td>
            <td>{t.status}</td>
            <td>
              <button disabled={!can("TASK", "READ")}>V</button>
              <button disabled={!can("TASK", "UPDATE")}>E</button>
              <button disabled={!can("TASK", "DELETE")}>D</button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default Home;
