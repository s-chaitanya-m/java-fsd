import React from "react";
import usePermission from "../hooks/usePermission";
import { projects } from "../constants/taskData";
import api from "../api/axios";

const ProjectPage = () => {
  const { can } = usePermission();
  const deleteProject = async () => {
    await api.delete("/projects/1");
  };
  const getProjects = async () => {
    await api.get("/projects");
  };
  return (
    <>
      <div>{can("PROJECT", "CREATE") && <button>Create Project</button>}</div>
      <div>
        <table>
          <tr>
            <th>Project</th>
            <th>End Date</th>
            <th>Owner</th>
          </tr>
          {projects.map((t) => (
            <tr>
              <td>{t.name}</td>
              <td>{t.end_date}</td>
              <td>{t.owner.join(", ")}</td>
              <td>
                <button onClick={() => getProjects()}>V</button>{" "}
                {/**disabled={!can("PROJECT", "READ")} */}
                <button>E</button> {/**disabled={!can("PROJECT", "UPDATE")} */}
                <button onClick={() => deleteProject()}>D</button>{" "}
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
