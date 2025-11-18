const API_URL = "http://localhost:5000/api/entrenadores";

// 🔹 Obtener todos los entrenadores
export async function getEntrenadores() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Error al obtener entrenadores");
  return await response.json();
}

// 🔹 Agregar un nuevo entrenador
export async function addEntrenador(entrenador) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entrenador),
  });

  if (!response.ok) throw new Error("Error al agregar entrenador");
  return await response.text();
}

// 🔹 Modificar un entrenador
export async function updateEntrenador(id, entrenador) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entrenador),
  });

  if (!response.ok) throw new Error("Error al modificar entrenador");
  return await response.text();
}

// 🔹 Eliminar entrenador (baja lógica)
export async function deleteEntrenador(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error("Error al eliminar entrenador");
  return await response.text();
}
