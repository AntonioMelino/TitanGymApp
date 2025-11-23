import { useEffect, useState, useCallback } from "react";
import entrenadoresService from "../services/entrenadoresService";

export default function useEntrenadores() {
  const [entrenadores, setEntrenadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEntrenadores = useCallback(async () => {
    try {
      setLoading(true);
      const response = await entrenadoresService.getEntrenadores();
      setEntrenadores(response.data);
    } catch {
      setError("No se pudieron cargar los entrenadores.");
    } finally {
      setLoading(false);
    }
  }, []);

  const getEntrenadorById = useCallback(async (id) => {
    const response = await entrenadoresService.getEntrenadorById(id);
    return response.data;
  }, []);

  const addEntrenador = async (entrenador) => {
    await entrenadoresService.addEntrenador(entrenador);
    fetchEntrenadores();
  };

  const updateEntrenador = async (id, entrenador) => {
    await entrenadoresService.updateEntrenador(id, entrenador);
    fetchEntrenadores();
  };

  const deleteEntrenador = async (id) => {
    await entrenadoresService.deleteEntrenador(id);
    fetchEntrenadores();
  };

  useEffect(() => {
    fetchEntrenadores();
  }, [fetchEntrenadores]);

  return {
    entrenadores,
    loading,
    error,
    getEntrenadorById,
    addEntrenador,
    updateEntrenador,
    deleteEntrenador,
  };
}
