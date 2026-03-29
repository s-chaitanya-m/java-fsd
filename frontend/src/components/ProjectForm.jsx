import React, { useState } from "react";
import { emptyProjectForm } from "../constants/helpers";

const ProjectForm = ({ onSubmit }) => {
  const [form, setForm] = useState(emptyProjectForm);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Project Name" onChange={handleChange} />
      <input
        name="description"
        placeholder="Project description"
        onChange={handleChange}
      />
      <input
        type="date"
        name="startDate"
        placeholder="Project startDate"
        onChange={handleChange}
      />
      <input
        type="date"
        name="endDate"
        placeholder="Project endDate"
        onChange={handleChange}
      />
      <button type="submit">Create</button>
    </form>
  );
};

export default ProjectForm;
