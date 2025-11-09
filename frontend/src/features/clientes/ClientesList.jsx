import { useEffect, useState } from "react";

function ClientesList() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/clientes")
      .then((res) => res.json())
      .then((data) => {
        setClientes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener clientes:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Cargando clientes...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Lista de Clientes</h2>
      {clientes.length === 0 ? (
        <p>No hay clientes cargados.</p>
      ) : (
        <table className="border-collapse border w-full text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">Nombre</th>
              <th className="border p-2">Apellido</th>
              <th className="border p-2">Correo</th>
              <th className="border p-2">Activo</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((c) => (
              <tr key={c.id}>
                <td className="border p-2">{c.id}</td>
                <td className="border p-2">{c.nombre}</td>
                <td className="border p-2">{c.apellido}</td>
                <td className="border p-2">{c.correo}</td>
                <td className="border p-2">{c.activo ? "✅" : "❌"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ClientesList;
