import { useState } from "react";
import pagosService from "../services/pagosService";
import { useNavigate } from "react-router-dom";

export default function PagoForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    clienteId: "",
    monto: "",
    metodo: "",
    fechaPago: "",
    estado: "Pagado",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await pagosService.addPago(form);

    navigate("/pagos");
  };

  return (
    <div className="container mt-4">
      <h2>Nuevo Pago</h2>

      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">ID Cliente</label>
          <input
            className="form-control"
            name="clienteId"
            value={form.clienteId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Monto</label>
          <input
            className="form-control"
            name="monto"
            value={form.monto}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Método</label>
          <select
            className="form-select"
            name="metodo"
            value={form.metodo}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione...</option>
            <option value="Efectivo">Efectivo</option>
            <option value="Transferencia">Transferencia</option>
            <option value="Tarjeta">Tarjeta</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Fecha Pago</label>
          <input
            type="date"
            className="form-control"
            name="fechaPago"
            value={form.fechaPago}
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn btn-success">Guardar</button>
      </form>
    </div>
  );
}
