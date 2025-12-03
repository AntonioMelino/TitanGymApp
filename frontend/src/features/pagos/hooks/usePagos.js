import { useState } from "react";
import pagosService from "../services/pagosService";

export default function usePagos() {
  const [pagos, setPagos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPagos = async () => {
    try {
      setLoading(true);
      const res = await pagosService.getPagos();
      setPagos(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { pagos, loading, error, fetchPagos };
}
