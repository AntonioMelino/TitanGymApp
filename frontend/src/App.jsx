import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import Home from "./pages/Home";
import { ClientesList, ClienteForm } from "./features/clientes";
import { EntrenadoresList, EntrenadorForm } from "./features/entrenadores";

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* CLIENTES */}
          <Route path="/clientes" element={<ClientesList />} />
          <Route path="/clientes/nuevo" element={<ClienteForm />} />
          <Route path="/clientes/editar/:id" element={<ClienteForm />} />

          {/* ENTRENADORES */}
          <Route path="/entrenadores" element={<EntrenadoresList />} />
          <Route path="/entrenadores/nuevo" element={<EntrenadorForm />} />
          <Route path="/entrenadores/editar/:id" element={<EntrenadorForm />} />

          {/* PAGOS */}
          <Route path="/pagos" element={<PagosList />} />
          <Route path="/pagos/nuevo" element={<PagoForm />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;
