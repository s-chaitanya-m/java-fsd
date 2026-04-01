import React, { useEffect, useState } from "react";
import usePermission from "../hooks/usePermission";
// import { projects } from "../constants/taskData";

import {
  createProject,
  deleteProject,
  getProject,
  getProjects,
  updateProject,
} from "../api/projects";
import ProjectForm from "../components/ProjectForm";
import { useNavigate } from "react-router-dom";

const ProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const { can } = usePermission();
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreate = async (form) => {
    try {
      await createProject(form);
      setShowForm(false);
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateProject = async (id, data) => {
    await updateProject(id, data);
    setEditingProject(null);
    fetchProjects();
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Delete project?")) return;
    await deleteProject(id);
    fetchProjects();
  };
  console.log(editingProject);

  return (
    <>
      <h2>Projects</h2>
      {can("PROJECT", "CREATE") && (
        <button onClick={() => setShowForm(true)}>Create Project</button>
      )}
      {showForm && <ProjectForm onSubmit={handleCreate} />}
      {editingProject && (
        <ProjectForm
          initialData={editingProject}
          onSubmit={(data) => handleUpdateProject(editingProject.id, data)}
        />
      )}
      <div>
        <table>
          <thead>
            <tr>
              <th>Project</th>
              <th>End Date</th>
              <th>Owner</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.endDate}</td>
                <td>{p.owner}</td>
                <td>
                  <button onClick={() => navigate(`/projects/${p.id}`)}>
                    Open
                  </button>

                  {can("PROJECT", "UPDATE") && (
                    <button onClick={() => setEditingProject(p)}>Edit</button>
                  )}

                  {can("PROJECT", "DELETE") && (
                    <button onClick={() => handleDeleteProject(p.id)}>
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProjectPage;
