import { useEffect, useState } from "react";
import { getUsers, updateUserRole, deleteUser } from "../api/users";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleRoleChange = async (id, role) => {
    await updateUserRole(id, role);
    fetchUsers();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete user?")) return;
    await deleteUser(id);
    fetchUsers();
  };

  return (
    <div>
      <h2>Admin Panel</h2>

      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.email}</td>

              <td>
                <select
                  value={u.role}
                  onChange={(e) =>
                    handleRoleChange(u.id, e.target.value)
                  }
                >
                  <option value="ADMIN">ADMIN</option>
                  <option value="CREATOR">CREATOR</option>
                  <option value="VIEWER">VIEWER</option>
                </select>
              </td>

              <td>
                <button onClick={() => handleDelete(u.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;