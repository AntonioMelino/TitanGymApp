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
import axios from "axios";

const EntrenadorForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const apiUrl = "http://localhost:5000/api/entrenadores";

  const [entrenador, setEntrenador] = useState({
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

  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);

  // Si hay ID, cargar entrenador existente
  useEffect(() => {
    const fetchEntrenador = async () => {
      if (!id) return;
      try {
        const response = await axios.get(`${apiUrl}/${id}`);
        setEntrenador(response.data);
      } catch (err) {
        console.error(err);
        setError("Error al cargar los datos del entrenador");
      }
    };
    fetchEntrenador();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setEntrenador({
      ...entrenador,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMensaje(null);

    try {
      if (id) {
        await axios.put(`${apiUrl}/${id}`, entrenador);
        setMensaje("Entrenador actualizado correctamente 💪");
      } else {
        await axios.post(apiUrl, entrenador);
        setMensaje("Entrenador creado correctamente 🏋️‍♂️");
      }

      setTimeout(() => navigate("/entrenadores"), 1500);
    } catch (err) {
      setError(
        "Error al guardar los datos. Verifica la conexión o los campos."
      );
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
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="DNI"
                  name="dni"
                  value={entrenador.dni}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Teléfono"
                  name="telefono"
                  value={entrenador.telefono}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nombre"
                  name="nombre"
                  value={entrenador.nombre}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Apellido"
                  name="apellido"
                  value={entrenador.apellido}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Correo"
                  name="correo"
                  value={entrenador.correo}
                  onChange={handleChange}
                  type="email"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Dirección"
                  name="direccion"
                  value={entrenador.direccion}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Especialidad (ej: Crossfit, HIIT)"
                  name="especialidad"
                  value={entrenador.especialidad}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Años de experiencia"
                  name="experiencia_Anios"
                  value={entrenador.experiencia_Anios}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Fecha de nacimiento"
                  name="fecha_Nacimiento"
                  value={entrenador.fecha_Nacimiento}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Sueldo"
                  name="sueldo"
                  value={entrenador.sueldo}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="time"
                  label="Hora inicio"
                  name="hora_Inicio"
                  value={entrenador.hora_Inicio}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="time"
                  label="Hora fin"
                  name="hora_Fin"
                  value={entrenador.hora_Fin}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={entrenador.activo}
                      onChange={(e) =>
                        setEntrenador({
                          ...entrenador,
                          activo: e.target.checked,
                        })
                      }
                      name="activo"
                      color="primary"
                    />
                  }
                  label={entrenador.activo ? "Activo" : "Inactivo"}
                />
              </Grid>

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
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default EntrenadorForm;
