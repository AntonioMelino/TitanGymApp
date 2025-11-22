const API_URL = "http://localhost:5000/api/clientes";

// 🔹 Obtener todos los clientes
export async function getClientes() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Error al obtener clientes");
  return await response.json();
}

// 🔹 Agregar un nuevo cliente
export async function addCliente(cliente) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cliente),
  });

  if (!response.ok) throw new Error("Error al agregar cliente");
  return await response.text();
}

// 🔹 Modificar un cliente
export async function updateCliente(id, cliente) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cliente),
  });

  if (!response.ok) throw new Error("Error al modificar cliente");
  return await response.text();
}

// 🔹 Eliminar un cliente (baja lógica)
export async function deleteCliente(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error("Error al eliminar cliente");
  return await response.text();
}
