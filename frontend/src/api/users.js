import api from "./axios";

export const getUsers = async () => {
  const res = await api.get("/users");
  return res.data;
};

export const updateUserRole = (id, role) =>
  api.put(`/users/${id}/role`, null, { params: { role } });

export const deleteUser = (id) =>
  api.delete(`/users/${id}`);