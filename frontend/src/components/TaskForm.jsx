import { useState } from "react";

const TaskForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    description: "",
    dueDate: "",
    ownerId: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
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

      <input
        name="ownerId"
        placeholder="Assign User ID"
        onChange={handleChange}
      />

      <button type="submit">Create Task</button>
    </form>
  );
};

export default TaskForm;