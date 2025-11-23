export function validarEntrenador(entrenador) {
  const errores = {};

  // Nombre obligatorio y mínimo 3 caracteres
  if (!entrenador.nombre || entrenador.nombre.trim().length < 3) {
    errores.nombre =
      "El nombre es obligatorio y debe tener al menos 3 caracteres.";
  }

  // Apellido obligatorio
  if (!entrenador.apellido || entrenador.apellido.trim().length < 3) {
    errores.apellido =
      "El apellido es obligatorio y debe tener al menos 3 caracteres.";
  }

  // Email válido
  if (!entrenador.email) {
    errores.email = "El email es obligatorio.";
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(entrenador.email)) {
    errores.email = "Debe ingresar un email válido.";
  }

  // Teléfono opcional, pero si existe debe ser numérico y tener mínimo 8 dígitos
  if (entrenador.telefono && !/^\d{8,15}$/.test(entrenador.telefono)) {
    errores.telefono = "El teléfono debe contener solo números (mínimo 8).";
  }

  // Especialidad obligatoria
  if (!entrenador.especialidad || entrenador.especialidad.trim().length < 3) {
    errores.especialidad = "Debe ingresar una especialidad válida.";
  }

  return errores;
}
