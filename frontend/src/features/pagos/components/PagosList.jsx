import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import usePagos from "./usePagos";

export default function PagosList() {
  const { pagos, loading, error, fetchPagos } = usePagos();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPagos();
  });

  if (loading) return <p>Cargando pagos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mt-4">
      <h2>Pagos</h2>

      <button
        className="btn btn-primary mb-3"
        onClick={() => navigate("/pagos/nuevo")}
      >
        Nuevo Pago
      </button>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>ID Cliente</th>
            <th>Monto</th>
            <th>Fecha Pago</th>
            <th>Estado</th>
          </tr>
        </thead>

        <tbody>
          {pagos.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.clienteId}</td>
              <td>${p.monto}</td>
              <td>{p.fechaPago?.substring(0, 10)}</td>
              <td>{p.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
