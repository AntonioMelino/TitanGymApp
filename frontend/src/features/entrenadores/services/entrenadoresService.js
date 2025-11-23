import api from "../../../api/httpEntrenador";

const entrenadoresService = {
  getEntrenadores: () => api.get("/entrenadores"),
  getEntrenadorById: (id) => api.get(`/entrenadores/${id}`),
  addEntrenador: (entrenador) => api.post("/entrenadores", entrenador),
  updateEntrenador: (id, entrenador) =>
    api.put(`/entrenadores/${id}`, entrenador),
  deleteEntrenador: (id) => api.delete(`/entrenadores/${id}`),
};

export default entrenadoresService;
