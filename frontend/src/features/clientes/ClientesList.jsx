import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const ClientesList = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const apiUrl = "http://localhost:5000/api/clientes";

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get(apiUrl);
        setClientes(response.data);
      } catch (error) {
        console.error("Error al obtener los clientes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClientes();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas desactivar este cliente?")) return;
    try {
      await axios.delete(`${apiUrl}/${id}`);
      setClientes(
        clientes.map((c) => (c.id === id ? { ...c, activo: false } : c))
      );
    } catch (error) {
      console.error("Error al desactivar cliente:", error);
    }
  };

  const handleActivate = async (id) => {
    if (!window.confirm("¿Deseas activar nuevamente este cliente?")) return;
    try {
      await axios.put(`${apiUrl}/${id}`, { activo: true });
      setClientes(
        clientes.map((c) => (c.id === id ? { ...c, activo: true } : c))
      );
    } catch (error) {
      console.error("Error al activar cliente:", error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "dni", headerName: "DNI", width: 100 },
    { field: "nombre", headerName: "Nombre", width: 150 },
    { field: "apellido", headerName: "Apellido", width: 150 },
    { field: "telefono", headerName: "Teléfono", width: 150 },
    { field: "correo", headerName: "Correo", width: 200 },
    {
      field: "activo",
      headerName: "Activo",
      width: 100,
      renderCell: (params) => (params.value ? "✅" : "❌"),
    },
    {
      field: "acciones",
      headerName: "Acciones",
      width: 250,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<EditIcon />}
            onClick={() => navigate(`/clientes/editar/${params.row.id}`)}
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
        <Typography variant="h5">Clientes</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/clientes/nuevo")}
        >
          Nuevo Cliente
        </Button>
      </Stack>

      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={clientes}
          columns={columns}
          pageSize={7}
          loading={loading}
          getRowId={(row) => row.id}
        />
      </div>
    </Box>
  );
};

export default ClientesList;
