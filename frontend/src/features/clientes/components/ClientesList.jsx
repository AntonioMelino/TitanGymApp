import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import useClientes from "../hooks/useClientes";

export default function ClientesList() {
  const { clientes, loading, deleteCliente, updateCliente } = useClientes();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    if (!window.confirm("¿Seguro que deseas desactivar este cliente?")) return;
    deleteCliente(id);
  };

  const handleActivate = (cliente) => {
    if (!window.confirm("¿Deseas activar nuevamente este cliente?")) return;
    updateCliente(cliente.id, { ...cliente, activo: true });
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
              onClick={() => handleActivate(params.row)}
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
      <Stack direction="row" justifyContent="space-between" mb={2}>
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
        <DataGrid rows={clientes} columns={columns} loading={loading} />
      </div>
    </Box>
  );
}
