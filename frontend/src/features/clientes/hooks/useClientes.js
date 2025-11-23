import { useEffect, useState } from "react";
import clientesService from "../services/clientesService";

export default function useClientes() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchClientes = async () => {
    try {
      setLoading(true);
      const response = await clientesService.getClientes();
      setClientes(response.data);
    } catch (err) {
      setError("No se pudieron cargar los clientes.");
    } finally {
      setLoading(false);
    }
  };

  const addCliente = async (cliente) => {
    await clientesService.addCliente(cliente);
    fetchClientes();
  };

  const updateCliente = async (id, cliente) => {
    await clientesService.updateCliente(id, cliente);
    fetchClientes();
  };

  const deleteCliente = async (id) => {
    await clientesService.deleteCliente(id);
    fetchClientes();
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  return {
    clientes,
    loading,
    error,
    addCliente,
    updateCliente,
    deleteCliente,
  };
}
