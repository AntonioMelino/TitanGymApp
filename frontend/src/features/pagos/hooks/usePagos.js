import { useState, useEffect, useCallback } from "react";
import pagosService from "../services/pagosService";

export default function usePagos() {
  const [pagos, setPagos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPagos = useCallback(async () => {
    try {
      setLoading(true);
      const response = await pagosService.getPagos();
      setPagos(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []); // ← IMPORTANTE: vacío y memoriza la función

  useEffect(() => {
    fetchPagos();
  }, [fetchPagos]); // ← ya no genera bucle

  return {
    pagos,
    loading,
    error,
    fetchPagos,
  };
}
