import api from "../../../api/httpClient";

const clientesService = {
  getClientes: () => api.get("/clientes"),
  getClienteById: (id) => api.get(`/clientes/${id}`),
  addCliente: (cliente) => api.post("/clientes", cliente),
  updateCliente: (id, cliente) => api.put(`/clientes/${id}`, cliente),
  deleteCliente: (id) => api.delete(`/clientes/${id}`),
};

export default clientesService;
