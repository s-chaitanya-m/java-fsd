import { useEffect, useState } from "react";
import { emptyTaskForm } from "../constants/helpers";
import { getUsers } from "../api/users";

const TaskForm = ({
  onSubmit,
  initialData = emptyTaskForm,
}) => {
  const [form, setForm] = useState(initialData);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...form,
      ownerId: Number(form.ownerId),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Task Description
        </label>

        <textarea
          name="description"
          value={form.description || ""}
          onChange={handleChange}
          placeholder="Describe the task..."
          rows={4}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
          required
        />
      </div>

      {/* Due Date */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Due Date
        </label>

        <input
          type="date"
          name="dueDate"
          value={form.dueDate || ""}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Assignee */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Assign To
        </label>

        <select
          name="ownerId"
          value={form.ownerId || ""}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        >
          <option value="">Select User</option>

          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>
      </div>

      {/* Submit */}
      <div>
        <button
          type="submit"
          className="w-full md:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition"
        >
          {initialData?.id ? "Update Task" : "Create Task"}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;