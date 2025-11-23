export function validarCliente(cliente) {
  // Campos obligatorios
  if (!cliente.nombre || !cliente.nombre.trim())
    return "El nombre es obligatorio.";

  if (!cliente.apellido || !cliente.apellido.trim())
    return "El apellido es obligatorio.";

  if (!cliente.dni) return "El DNI es obligatorio.";

  // Validaciones de formato
  const dniString = cliente.dni.toString().trim();
  if (dniString.length < 7 || dniString.length > 10)
    return "El DNI debe tener entre 7 y 10 dígitos.";

  // Email opcional pero con formato válido
  if (cliente.correo && !/\S+@\S+\.\S+/.test(cliente.correo))
    return "El correo no tiene un formato válido.";

  return null; // ✔ Todo OK
}
