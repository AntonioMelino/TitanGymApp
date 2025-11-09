import { ClientesList, ClienteForm } from "./features/clientes";

function App() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Titan Gym - Clientes
      </h1>

      <ClienteForm />
      <hr className="my-6" />
      <ClientesList />
    </div>
  );
}

export default App;
