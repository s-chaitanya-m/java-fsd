import React, { useEffect, useState } from "react";
import usePermission from "../hooks/usePermission";
// import { projects } from "../constants/taskData";

import {
  createProject,
  deleteProject,
  // getProject,
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

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Projects
          </h1>
          <p className="text-slate-500 mt-1">
            Manage and organize your projects.
          </p>
        </div>

        {can("PROJECT", "CREATE") && (
          <button
            onClick={() => setShowForm(true)}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition"
          >
            + Create Project
          </button>
        )}
      </div>

      {/* Forms */}
      {showForm && (
        <div className="mb-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <ProjectForm onSubmit={handleCreate} />
        </div>
      )}

      {editingProject && (
        <div className="mb-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <ProjectForm
            initialData={editingProject}
            onSubmit={(data) =>
              handleUpdateProject(editingProject.id, data)
            }
          />
        </div>
      )}

      {/* Empty State */}
      {projects.length === 0 ? (
        <div className="bg-white rounded-xl border border-dashed border-slate-300 p-12 text-center">
          <div className="text-5xl mb-4">📁</div>

          <h3 className="text-xl font-semibold text-slate-700">
            No Projects Found
          </h3>

          <p className="text-slate-500 mt-2">
            Create your first project to get started.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-slate-800">
                  {project.name}
                </h3>
              </div>

              <div className="space-y-2 text-sm text-slate-600">
                <p>
                  <span className="font-medium">Owner:</span>{" "}
                  {project.owner}
                </p>

                <p>
                  <span className="font-medium">End Date:</span>{" "}
                  {project.endDate}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-5">
                <button
                  onClick={() => navigate(`/projects/${project.id}`)}
                  className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm"
                >
                  Open
                </button>

                {can("PROJECT", "UPDATE") && (
                  <button
                    onClick={() => setEditingProject(project)}
                    className="px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm"
                  >
                    Edit
                  </button>
                )}

                {can("PROJECT", "DELETE") && (
                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectPage;
