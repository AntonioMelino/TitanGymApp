import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Switch,
  FormControlLabel,
  Stack,
  Alert,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import useEntrenadores from "../hooks/useEntrenadores";
import { validarEntrenador } from "../validators/entrenadorValidator";

const EntrenadorForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 📌 Hook CRUD centralizado
  const { getEntrenadorById, addEntrenador, updateEntrenador } =
    useEntrenadores();

  const [form, setForm] = useState({
    dni: "",
    nombre: "",
    apellido: "",
    direccion: "",
    telefono: "",
    correo: "",
    especialidad: "",
    experiencia_Anios: 0,
    fecha_Nacimiento: "",
    sueldo: 0,
    hora_Inicio: "08:00",
    hora_Fin: "18:00",
    activo: true,
  });

  const [errors, setErrors] = useState({});
  const [mensaje, setMensaje] = useState(null);
  const [errorServidor, setErrorServidor] = useState(null);

  // 📌 Si hay ID → carga entrenador
  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const data = await getEntrenadorById(id);
        setForm(data);
      } catch {
        setErrorServidor("Error al cargar los datos del entrenador.");
      }
    };
    fetchData();
  }, [id, getEntrenadorById]);

  // 📌 Controlador de inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  // 📌 Submit con validaciones
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(null);
    setErrorServidor(null);

    const erroresVal = validarEntrenador(form);
    setErrors(erroresVal);

    if (Object.keys(erroresVal).length > 0) return;

    try {
      if (id) {
        await updateEntrenador(id, form);
        setMensaje("Entrenador actualizado correctamente 💪");
      } else {
        await addEntrenador(form);
        setMensaje("Entrenador creado correctamente 🏋️‍♂️");
      }

      setTimeout(() => navigate("/entrenadores"), 1500);
    } catch {
      setErrorServidor("Error al guardar los datos. Intente nuevamente.");
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Card sx={{ width: 900, boxShadow: 5, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom align="center">
            {id ? "Editar Entrenador" : "Nuevo Entrenador"}
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              {/* DNI */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="DNI"
                  name="dni"
                  value={form.dni}
                  onChange={handleChange}
                />
              </Grid>

              {/* Teléfono */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Teléfono"
                  name="telefono"
                  value={form.telefono}
                  onChange={handleChange}
                  error={!!errors.telefono}
                  helperText={errors.telefono}
                />
              </Grid>

              {/* Nombre */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nombre"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  error={!!errors.nombre}
                  helperText={errors.nombre}
                  required
                />
              </Grid>

              {/* Apellido */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Apellido"
                  name="apellido"
                  value={form.apellido}
                  onChange={handleChange}
                  error={!!errors.apellido}
                  helperText={errors.apellido}
                  required
                />
              </Grid>

              {/* Correo */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Correo"
                  name="correo"
                  type="email"
                  value={form.correo}
                  onChange={handleChange}
                />
              </Grid>

              {/* Dirección */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Dirección"
                  name="direccion"
                  value={form.direccion}
                  onChange={handleChange}
                />
              </Grid>

              {/* Especialidad */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Especialidad"
                  name="especialidad"
                  value={form.especialidad}
                  onChange={handleChange}
                  error={!!errors.especialidad}
                  helperText={errors.especialidad}
                />
              </Grid>

              {/* Años de experiencia */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Años de experiencia"
                  name="experiencia_Anios"
                  value={form.experiencia_Anios}
                  onChange={handleChange}
                />
              </Grid>

              {/* Fecha nacimiento */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Fecha de nacimiento"
                  name="fecha_Nacimiento"
                  InputLabelProps={{ shrink: true }}
                  value={form.fecha_Nacimiento}
                  onChange={handleChange}
                />
              </Grid>

              {/* Sueldo */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Sueldo"
                  name="sueldo"
                  value={form.sueldo}
                  onChange={handleChange}
                />
              </Grid>

              {/* Horarios */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="time"
                  label="Hora inicio"
                  name="hora_Inicio"
                  InputLabelProps={{ shrink: true }}
                  value={form.hora_Inicio}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="time"
                  label="Hora fin"
                  name="hora_Fin"
                  InputLabelProps={{ shrink: true }}
                  value={form.hora_Fin}
                  onChange={handleChange}
                />
              </Grid>

              {/* Switch activo */}
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={form.activo}
                      onChange={handleChange}
                      name="activo"
                    />
                  }
                  label={form.activo ? "Activo" : "Inactivo"}
                />
              </Grid>

              {/* Botones */}
              <Grid item xs={12}>
                <Stack direction="row" justifyContent="space-between">
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => navigate("/entrenadores")}
                  >
                    Volver
                  </Button>
                  <Button variant="contained" color="primary" type="submit">
                    {id ? "Guardar Cambios" : "Crear Entrenador"}
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>

          {mensaje && (
            <Alert severity="success" sx={{ mt: 2 }}>
              {mensaje}
            </Alert>
          )}
          {errorServidor && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {errorServidor}
            </Alert>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default EntrenadorForm;
