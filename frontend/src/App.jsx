import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener usuarios");
        return res.json();
      })
      .then((data) => setUsers(data))
      .catch((err) => {
        console.error(err);
        setError("No se pudieron cargar los usuarios. Ver consola.");
      });
  }, []);

  return (
    <div style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>TitanGymApp 🏋️</h1>
      <h2>Lista de usuarios</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {users.length === 0 && !error ? (
        <p>Cargando usuarios...</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <strong>{user.name}</strong> — {user.role}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
