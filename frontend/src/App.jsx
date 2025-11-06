import { useEffect, useState } from "react";

function App() {
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Reemplaza la URL por la de tu backend si usa otro puerto o https
    fetch("http://localhost:5000/api/hello")
      .then((res) => {
        if (!res.ok) throw new Error("Error en la respuesta del servidor");
        return res.json();
      })
      .then((data) => setMensaje(data.message))
      .catch((err) => {
        console.error(err);
        setError("No se pudo conectar con el backend. Revisa consola.");
      });
  }, []);

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        textAlign: "center",
        marginTop: "3rem",
      }}
    >
      <h1>TitanGymApp 🏋️</h1>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <p>{mensaje || "Cargando..."}</p>
      )}
    </div>
  );
}

export default App;
