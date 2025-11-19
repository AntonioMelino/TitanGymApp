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
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ClienteForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const apiUrl = "http://localhost:5000/api/clientes";

  const [cliente, setCliente] = useState({
    dni: "",
    nombre: "",
    apellido: "",
    direccion: "",
    telefono: "",
    correo: "",
    activo: true,
  });

  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);

  // Validaciones simples
  const validarFormulario = () => {
    if (!cliente.nombre || !cliente.apellido || !cliente.dni) {
      setError("Nombre, apellido y DNI son obligatorios.");
      return false;
    }

    if (cliente.correo && !/\S+@\S+\.\S+/.test(cliente.correo)) {
      setError("El correo no tiene un formato válido.");
      return false;
    }

    if (cliente.dni.length < 7 || cliente.dni.length > 10) {
      setError("El DNI debe tener entre 7 y 10 dígitos.");
      return false;
    }

    return true;
  };

  // Si hay ID, cargar cliente existente
  useEffect(() => {
    const fetchCliente = async () => {
      if (!id) return;
      try {
        const response = await axios.get(`${apiUrl}/${id}`);
        setCliente(response.data);
      } catch (err) {
        console.error(err);
        setError("Error al cargar los datos del cliente");
      }
    };
    fetchCliente();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCliente({
      ...cliente,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMensaje(null);

    if (!validarFormulario()) return;

    setLoading(true);

    try {
      if (id) {
        await axios.put(`${apiUrl}/${id}`, cliente);
        setMensaje("Cliente actualizado correctamente ✅");
      } else {
        await axios.post(apiUrl, { ...cliente, fecha_Alta: new Date() });
        setMensaje("Cliente creado correctamente ✅");
      }

      setTimeout(() => navigate("/clientes"), 1200);
    } catch (err) {
      if (err.response?.status === 409) {
        setError("DNI o correo ya existen en la base de datos.");
      } else {
        setError("Error al guardar los datos.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Card sx={{ width: 800, boxShadow: 5, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom align="center">
            {id ? "Editar Cliente" : "Nuevo Cliente"}
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="DNI"
                  name="dni"
                  value={cliente.dni}
                  onChange={handleChange}
                  required
                  type="number"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Teléfono"
                  name="telefono"
                  value={cliente.telefono}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nombre"
                  name="nombre"
                  value={cliente.nombre}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Apellido"
                  name="apellido"
                  value={cliente.apellido}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Correo"
                  name="correo"
                  value={cliente.correo}
                  onChange={handleChange}
                  type="email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Dirección"
                  name="direccion"
                  value={cliente.direccion}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={cliente.activo}
                      onChange={(e) =>
                        setCliente({ ...cliente, activo: e.target.checked })
                      }
                      name="activo"
                      color="primary"
                    />
                  }
                  label={cliente.activo ? "Activo" : "Inactivo"}
                />
              </Grid>

              <Grid item xs={12}>
                <Stack direction="row" justifyContent="space-between">
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => navigate("/clientes")}
                    disabled={loading}
                  >
                    Volver
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : id ? (
                      "Guardar Cambios"
                    ) : (
                      "Crear Cliente"
                    )}
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>

          {/* SNACKBAR */}
          <Snackbar
            open={!!mensaje || !!error}
            autoHideDuration={2000}
            onClose={() => {
              setMensaje(null);
              setError(null);
            }}
          >
            {mensaje ? (
              <Alert severity="success">{mensaje}</Alert>
            ) : error ? (
              <Alert severity="error">{error}</Alert>
            ) : null}
          </Snackbar>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ClienteForm;
