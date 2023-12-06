import axios from "../setup/axios";

const createRoles = (roles) => {
  return axios.post("/api/v1/role/create", [...roles]);
};
const fetchAllRoles = () => {
  return axios.get(`/api/v1/role/read`);
};
const deleteRoles = (role) => {
  return axios.delete("/api/v1/role/delete", {
    data: { id: role.id },
  });
};
export { createRoles, fetchAllRoles, deleteRoles };
