import React, { useEffect, useState } from "react";
import usePermission from "../hooks/usePermission";
// import { projects } from "../constants/taskData";

import {
  createProject,
  deleteProject,
  getProject,
  getProjects,
} from "../api/projects";
import ProjectForm from "../components/ProjectForm";
import { useNavigate } from "react-router-dom";

const ProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);

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

  // const deleteProject = async () => {
  //   await api.delete("/projects/1");
  // };
  // const getProjects = async () => {
  //   await api.get("/projects");
  // };
  return (
    <>
      <h2>Projects</h2>
      {can("PROJECT", "CREATE") && (
        <button onClick={() => setShowForm(true)}>Create Project</button>
      )}
      {showForm && <ProjectForm onSubmit={handleCreate} />}
      <div>
        <table>
          <tr>
            <th>Project</th>
            <th>End Date</th>
            <th>Owner</th>
          </tr>
          {projects.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.endDate}</td>
              <td>{p.owner}</td>
              <td>
                <button onClick={() => navigate(`/projects/${p.id}`)}>V</button>
                {/**disabled={!can("PROJECT", "READ")} */}
                <button>E</button> {/**disabled={!can("PROJECT", "UPDATE")} */}
                <button onClick={() => deleteProject()}>D</button>
                {/**disabled={!can("PROJECT", "DELETE")}*/}
              </td>
            </tr>
          ))}
        </table>
      </div>
    </>
  );
};

export default ProjectPage;
