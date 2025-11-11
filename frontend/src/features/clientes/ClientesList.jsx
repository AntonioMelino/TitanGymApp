import { useEffect, useState } from "react";
import { getClientes, updateCliente, deleteCliente } from "./clientesService"; // 👈 Importamos las funciones del servicio

function ClientesList() {
  const [clientes, setClientes] = useState([]);
  const [editando, setEditando] = useState(null);
  const [formData, setFormData] = useState({
    dni: "",
    nombre: "",
    apellido: "",
    direccion: "",
    telefono: "",
    correo: "",
  });

  // 🔹 Cargar clientes al iniciar
  const fetchClientes = async () => {
    try {
      const data = await getClientes();
      setClientes(data);
    } catch (error) {
      console.error(error);
      alert("Error al cargar clientes");
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (cliente) => {
    setEditando(cliente.id);
    setFormData({
      dni: cliente.dni,
      nombre: cliente.nombre,
      apellido: cliente.apellido,
      direccion: cliente.direccion,
      telefono: cliente.telefono,
      correo: cliente.correo,
    });
  };

  const cancelarEdicion = () => {
    setEditando(null);
    setFormData({
      dni: "",
      nombre: "",
      apellido: "",
      direccion: "",
      telefono: "",
      correo: "",
    });
  };

  const guardarCambios = async (id) => {
    try {
      await updateCliente(id, { id, ...formData, activo: true });
      alert("✅ Cliente actualizado correctamente");
      setEditando(null);
      fetchClientes();
    } catch (error) {
      alert(error.message);
    }
  };

  const eliminarCliente = async (id) => {
    if (!confirm("¿Seguro que querés eliminar este cliente?")) return;

    try {
      await deleteCliente(id);
      alert("🗑️ Cliente eliminado correctamente");
      fetchClientes();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow mt-8">
      <h2 className="text-xl font-bold mb-4 text-center">Lista de Clientes</h2>

      {clientes.length === 0 ? (
        <p className="text-center text-gray-500">
          No hay clientes registrados.
        </p>
      ) : (
        <table className="w-full border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">DNI</th>
              <th className="p-2 border">Nombre</th>
              <th className="p-2 border">Apellido</th>
              <th className="p-2 border">Dirección</th>
              <th className="p-2 border">Teléfono</th>
              <th className="p-2 border">Correo</th>
              <th className="p-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id} className="text-center">
                {editando === cliente.id ? (
                  <>
                    {[
                      "dni",
                      "nombre",
                      "apellido",
                      "direccion",
                      "telefono",
                      "correo",
                    ].map((campo) => (
                      <td key={campo} className="border p-1">
                        <input
                          type="text"
                          name={campo}
                          value={formData[campo]}
                          onChange={handleChange}
                          className="border border-gray-300 rounded p-1 w-full"
                        />
                      </td>
                    ))}
                    <td className="border p-1">
                      <button
                        onClick={() => guardarCambios(cliente.id)}
                        className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                      >
                        💾 Guardar
                      </button>
                      <button
                        onClick={cancelarEdicion}
                        className="bg-gray-400 text-white px-2 py-1 rounded"
                      >
                        ❌ Cancelar
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border p-1">{cliente.dni}</td>
                    <td className="border p-1">{cliente.nombre}</td>
                    <td className="border p-1">{cliente.apellido}</td>
                    <td className="border p-1">{cliente.direccion}</td>
                    <td className="border p-1">{cliente.telefono}</td>
                    <td className="border p-1">{cliente.correo}</td>
                    <td className="border p-1">
                      <button
                        onClick={() => handleEdit(cliente)}
                        className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                      >
                        ✏️ Editar
                      </button>
                      <button
                        onClick={() => eliminarCliente(cliente.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        🗑️ Eliminar
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ClientesList;
