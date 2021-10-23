import { axiosConfig } from "../http-common";

export const getAll =  async () => {
   return await axiosConfig.get("/shipments");
};

export const create = async (data) => {
  return (await axiosConfig.post("/shipments", data)).data;
};

export const update = async (id, data) => {
  return (await axiosConfig.put(`/shipments/${id}`, data)).data;
};

export const remove = async (id) => {
  return (await axiosConfig.delete(`/shipments/${id}`)).data;
};

export const get = async (id) => {
  return (await axiosConfig.get(`/shipments/${id}`)).data;
};
