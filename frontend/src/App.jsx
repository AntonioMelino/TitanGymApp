import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import Home from "./pages/Home";
import { ClientesList, ClienteForm } from "./features/clientes";

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clientes" element={<ClientesList />} />
          <Route path="/clientes/nuevo" element={<ClienteForm />} />
          <Route path="/clientes/editar/:id" element={<ClienteForm />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;
