import { useState } from "react";

function ClienteForm() {
  const [formData, setFormData] = useState({
    dni: "",
    nombre: "",
    apellido: "",
    direccion: "",
    telefono: "",
    correo: "",
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoCliente = {
      dni: parseInt(formData.dni),
      nombre: formData.nombre,
      apellido: formData.apellido,
      direccion: formData.direccion,
      telefono: formData.telefono,
      correo: formData.correo,
      fecha_Alta: new Date().toISOString(),
      activo: true,
    };

    try {
      const response = await fetch("http://localhost:5000/api/clientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoCliente),
      });

      if (response.ok) {
        setMensaje("✅ Cliente agregado correctamente");
        setFormData({
          dni: "",
          nombre: "",
          apellido: "",
          direccion: "",
          telefono: "",
          correo: "",
        });
      } else {
        const error = await response.text();
        setMensaje("❌ Error: " + error);
      }
    } catch (error) {
      setMensaje("⚠️ Error de conexión con el servidor");
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg max-w-md mx-auto mt-6 shadow">
      <h2 className="text-xl font-bold mb-4 text-center">Agregar Cliente</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        {["dni", "nombre", "apellido", "direccion", "telefono", "correo"].map(
          (campo) => (
            <input
              key={campo}
              type={campo === "dni" ? "number" : "text"}
              name={campo}
              value={formData[campo]}
              onChange={handleChange}
              placeholder={campo.charAt(0).toUpperCase() + campo.slice(1)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
              required
            />
          )
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
        >
          Guardar Cliente
        </button>
      </form>

      {mensaje && <p className="mt-4 text-center">{mensaje}</p>}
    </div>
  );
}

export default ClienteForm;
