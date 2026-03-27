import { useState } from "react";
import { emptyTaskForm } from "../constants/helpers";

const TaskForm = ({ onSubmit }) => {
  const [form, setForm] = useState(emptyTaskForm);

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      ownerId: Number(form.ownerId),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="description"
        placeholder="Task Description"
        onChange={handleChange}
      />

      <input
        type="date"
        name="dueDate"
        onChange={handleChange}
      />

      {/* ✅ User Dropdown */}
      <select name="ownerId" onChange={handleChange}>
        <option value="">Select User</option>
        {users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.name} ({u.email})
          </option>
        ))}
      </select>

      <button type="submit">Create Task</button>
    </form>
  );
};

export default TaskForm;
