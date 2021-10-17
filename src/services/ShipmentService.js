import http from "../http-common";

const getAll = () => {
  return http.get("/shipments");
};

const create = data => {
  return http.post("/shipments", data);
};

const update = (id, data) => {
  return http.put(`/shipments/${id}`, data);
};

const remove = id => {
  return http.delete(`/shipments/${id}`);
};


const get = id => {
    return http.get(`/shipments/${id}`);
};

// const removeAll = () => {
//   return http.delete(`/tutorials`);
// };

// const findByTitle = title => {
//   return http.get(`/tutorials?title=${title}`);
// };

const ShipmentService = {
  getAll,
  create,
  update,
  remove,
  get
};

export default ShipmentService;