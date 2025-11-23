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
import useClientes from "../hooks/useClientes";
import { validarCliente } from "../validators/clienteValidator";

const ClienteForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addCliente, updateCliente, getClienteById, loading } = useClientes();

  const [cliente, setCliente] = useState({
    dni: "",
    nombre: "",
    apellido: "",
    direccion: "",
    telefono: "",
    correo: "",
    activo: true,
  });

  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);

  const [fieldErrors, setFieldErrors] = useState({});

  // Obtener cliente si estamos editando
  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const data = await getClienteById(id);
        setCliente(data);
      } catch {
        setError("No se pudieron cargar los datos.");
      }
    };

    fetchData();
  }, [id, getClienteById]);

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
    setFieldErrors({});

    const validationMsg = validarCliente(cliente);
    if (validationMsg) {
      setError(validationMsg);

      // Marca los campos necesarios
      if (validationMsg.toLowerCase().includes("dni")) {
        setFieldErrors({ dni: true });
      }
      if (validationMsg.toLowerCase().includes("correo")) {
        setFieldErrors({ correo: true });
      }
      return;
    }

    try {
      if (id) {
        await updateCliente(id, cliente);
        setMensaje("Cambios guardados correctamente.");
      } else {
        await addCliente(cliente);
        setMensaje("Cliente creado exitosamente.");
      }

      setTimeout(() => navigate("/clientes"), 1500);
    } catch (err) {
      if (err.response?.status === 409) {
        setError("⚠️ El DNI o correo ya existen.");
      } else {
        setError("❌ Error al procesar la acción.");
      }
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Card sx={{ width: 800, boxShadow: 5, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h5" align="center">
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
                  error={fieldErrors.dni}
                  helperText={
                    fieldErrors.dni ? "DNI inválido o existente." : ""
                  }
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
                  type="email"
                  value={cliente.correo}
                  onChange={handleChange}
                  error={fieldErrors.correo}
                  helperText={fieldErrors.correo ? "Formato no válido." : ""}
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
                    />
                  }
                  label={cliente.activo ? "Activo" : "Inactivo"}
                />
              </Grid>

              <Grid item xs={12}>
                <Stack direction="row" justifyContent="space-between">
                  <Button
                    variant="outlined"
                    onClick={() => navigate("/clientes")}
                    disabled={loading}
                  >
                    Volver
                  </Button>

                  <Button variant="contained" type="submit" disabled={loading}>
                    {loading ? (
                      <CircularProgress size={24} />
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

          <Snackbar
            open={!!mensaje || !!error}
            autoHideDuration={2500}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            onClose={() => {
              setMensaje(null);
              setError(null);
            }}
          >
            {mensaje ? (
              <Alert variant="filled" severity="success">
                {mensaje}
              </Alert>
            ) : error ? (
              <Alert variant="filled" severity="error">
                {error}
              </Alert>
            ) : null}
          </Snackbar>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ClienteForm;
