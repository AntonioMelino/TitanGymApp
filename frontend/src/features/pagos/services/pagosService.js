import api from "../../../api/httpPagos";

const pagosService = {
  getPagos: () => api.get("/pagos"),
  getPagosPorCliente: (id) => api.get(`/pagos/cliente/${id}`),
  addPago: (pago) => api.post("/pagos", pago),
  updatePago: (id, pago) => api.put(`/pagos/${id}`, pago),
  deletePago: (id) => api.delete(`/pagos/${id}`),
};

export default pagosService;
