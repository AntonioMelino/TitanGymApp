import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Stack,
  Snackbar,
  Alert,
  CircularProgress,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import pagosService from "../services/pagosService";

export default function PagosForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    clienteId: "",
    monto: "",
    metodo: "",
    fechaPago: "",
    estado: "Pagado",
  });

  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(null);
    setError(null);
    setLoading(true);

    try {
      await pagosService.addPago(form);
      setMensaje("Pago registrado correctamente.");

      setTimeout(() => navigate("/pagos"), 1500);
    } catch {
      setError("❌ Error al registrar el pago.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Card sx={{ width: 700, boxShadow: 5, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h5" align="center">
            Nuevo Pago
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="ID Cliente"
                  name="clienteId"
                  value={form.clienteId}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Monto"
                  name="monto"
                  type="number"
                  value={form.monto}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Método de Pago"
                  name="metodo"
                  value={form.metodo}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="Efectivo">Efectivo</MenuItem>
                  <MenuItem value="Transferencia">Transferencia</MenuItem>
                  <MenuItem value="Tarjeta">Tarjeta</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Fecha de Pago"
                  name="fechaPago"
                  value={form.fechaPago}
                  InputLabelProps={{ shrink: true }}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <Stack direction="row" justifyContent="space-between">
                  <Button
                    variant="outlined"
                    onClick={() => navigate("/pagos")}
                    disabled={loading}
                  >
                    Volver
                  </Button>

                  <Button variant="contained" type="submit" disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : "Guardar Pago"}
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>

          {/* SNACKBAR */}
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
}
