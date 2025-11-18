import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const EntrenadoresList = () => {
  const [entrenadores, setEntrenadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const apiUrl = "http://localhost:5000/api/entrenadores";

  useEffect(() => {
    const fetchEntrenadores = async () => {
      try {
        const response = await axios.get(apiUrl);
        setEntrenadores(response.data);
      } catch (error) {
        console.error("Error al obtener los entrenadores:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEntrenadores();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas desactivar este entrenador?"))
      return;
    try {
      await axios.delete(`${apiUrl}/${id}`);
      setEntrenadores(
        entrenadores.map((e) => (e.id === id ? { ...e, activo: false } : e))
      );
    } catch (error) {
      console.error("Error al desactivar entrenador:", error);
    }
  };

  const handleActivate = async (id) => {
    if (!window.confirm("¿Deseas activar nuevamente este entrenador?")) return;
    try {
      await axios.put(`${apiUrl}/${id}`, { activo: true });
      setEntrenadores(
        entrenadores.map((e) => (e.id === id ? { ...e, activo: true } : e))
      );
    } catch (error) {
      console.error("Error al activar entrenador:", error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "dni", headerName: "DNI", width: 100 },
    { field: "nombre", headerName: "Nombre", width: 150 },
    { field: "apellido", headerName: "Apellido", width: 150 },
    { field: "telefono", headerName: "Teléfono", width: 150 },
    { field: "especialidad", headerName: "Especialidad", width: 180 },
    { field: "experiencia_Anios", headerName: "Años Exp.", width: 120 },
    {
      field: "activo",
      headerName: "Activo",
      width: 90,
      renderCell: (params) => (params.value ? "✅" : "❌"),
    },
    {
      field: "acciones",
      headerName: "Acciones",
      width: 260,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            size="small"
            startIcon={<EditIcon />}
            onClick={() => navigate(`/entrenadores/editar/${params.row.id}`)}
          >
            Editar
          </Button>

          {params.row.activo ? (
            <Button
              variant="outlined"
              color="error"
              size="small"
              startIcon={<DeleteIcon />}
              onClick={() => handleDelete(params.row.id)}
            >
              Desactivar
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="success"
              size="small"
              startIcon={<CheckCircleIcon />}
              onClick={() => handleActivate(params.row.id)}
            >
              Activar
            </Button>
          )}
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5">Entrenadores</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/entrenadores/nuevo")}
        >
          Nuevo Entrenador
        </Button>
      </Stack>

      <div style={{ height: 550, width: "100%" }}>
        <DataGrid
          rows={entrenadores}
          columns={columns}
          pageSize={7}
          loading={loading}
          getRowId={(row) => row.id}
        />
      </div>
    </Box>
  );
};

export default EntrenadoresList;
