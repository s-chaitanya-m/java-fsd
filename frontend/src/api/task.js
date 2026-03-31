import api from "./axios";

export const getTasks = (projectId) =>
  api.get(`/tasks/project/${projectId}`);

export const getTask = (taskId) =>
  api.get(`/tasks/${taskId}`);

export const deleteTask = (taskId) =>
  api.delete(`/tasks/${taskId}`);

export const getUserTasks = () =>
  api.get(`/tasks`);

export const createTask = (data) =>
  api.post("/tasks", data);

export const updateTaskStatus = (id, status) =>
  api.patch(`/tasks/${id}/status`, null, {
    params: { status },
  });

export const updateTask = (id, data) =>
  api.put(`/tasks/${id}`, data);