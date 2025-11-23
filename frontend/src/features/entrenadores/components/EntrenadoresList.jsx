import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import useEntrenadores from "../hooks/useEntrenadores";

export default function EntrenadoresList() {
  const { entrenadores, loading, deleteEntrenador, updateEntrenador } =
    useEntrenadores();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    if (!window.confirm("¿Seguro que deseas desactivar este entrenador?"))
      return;
    deleteEntrenador(id);
  };

  const handleActivate = (entrenador) => {
    if (!window.confirm("¿Deseas activar nuevamente este entrenador?")) return;
    updateEntrenador(entrenador.id, { ...entrenador, activo: true });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "dni", headerName: "DNI", width: 100 },
    { field: "nombre", headerName: "Nombre", width: 150 },
    { field: "apellido", headerName: "Apellido", width: 150 },
    { field: "telefono", headerName: "Teléfono", width: 140 },
    { field: "correo", headerName: "Correo", width: 200 },
    { field: "especialidad", headerName: "Especialidad", width: 160 },
    { field: "experienciaAnios", headerName: "Años Exp.", width: 120 },
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
        <Typography variant="h5">Entrenadores</Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/entrenadores/nuevo")}
        >
          Nuevo Entrenador
        </Button>
      </Stack>

      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={entrenadores}
          columns={columns}
          loading={loading}
          getRowId={(row) => row.id}
        />
      </div>
    </Box>
  );
}
