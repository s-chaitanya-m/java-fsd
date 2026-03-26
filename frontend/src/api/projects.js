import api from "./axios";

export const getProjects = async () => {
  const res = await api.get("projects");
  return res.data;
};

export const createProject = async (data) => {
  const res = await api.post("/projects", data);
  return res.data;
};
