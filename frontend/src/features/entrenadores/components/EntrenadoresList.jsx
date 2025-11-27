import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Typography,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import useEntrenadores from "../hooks/useEntrenadores";
import { useState } from "react";

export default function EntrenadoresList() {
  const { entrenadores, loading, deleteEntrenador, updateEntrenador } =
    useEntrenadores();
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEntrenador, setSelectedEntrenador] = useState(null);
  const [accion, setAccion] = useState(""); // "activar" | "desactivar"

  const abrirModal = (entrenador, tipo) => {
    setSelectedEntrenador(entrenador);
    setAccion(tipo);
    setModalOpen(true);
  };

  const cerrarModal = () => {
    setModalOpen(false);
    setSelectedEntrenador(null);
    setAccion("");
  };

  const confirmarAccion = () => {
    if (!selectedEntrenador) return;

    if (accion === "desactivar") {
      deleteEntrenador(selectedEntrenador.id);
    } else if (accion === "activar") {
      updateEntrenador(selectedEntrenador.id, {
        ...selectedEntrenador,
        activo: true,
      });
    }

    cerrarModal();
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
              onClick={() => abrirModal(params.row, "desactivar")}
            >
              Desactivar
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="success"
              size="small"
              startIcon={<CheckCircleIcon />}
              onClick={() => abrirModal(params.row, "activar")}
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

      {/* MODAL DE CONFIRMACIÓN */}
      <Dialog open={modalOpen} onClose={cerrarModal}>
        <DialogTitle>
          {accion === "desactivar"
            ? "Desactivar Entrenador"
            : "Activar Entrenador"}
        </DialogTitle>

        <DialogContent>
          <Typography>
            {accion === "desactivar"
              ? `¿Estás seguro que deseas desactivar a ${selectedEntrenador?.nombre} ${selectedEntrenador?.apellido}?`
              : `¿Deseas activar nuevamente a ${selectedEntrenador?.nombre} ${selectedEntrenador?.apellido}?`}
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={cerrarModal}>Cancelar</Button>
          <Button
            variant="contained"
            color={accion === "desactivar" ? "error" : "success"}
            onClick={confirmarAccion}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
