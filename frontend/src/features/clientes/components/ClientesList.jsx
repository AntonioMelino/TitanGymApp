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
import useClientes from "../hooks/useClientes";
import { useState } from "react";

export default function ClientesList() {
  const { clientes, loading, deleteCliente, updateCliente } = useClientes();
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [accion, setAccion] = useState(""); // "activar" | "desactivar"

  const abrirModal = (cliente, tipo) => {
    setSelectedCliente(cliente);
    setAccion(tipo);
    setModalOpen(true);
  };

  const cerrarModal = () => {
    setModalOpen(false);
    setSelectedCliente(null);
    setAccion("");
  };

  const confirmarAccion = () => {
    if (!selectedCliente) return;

    if (accion === "desactivar") {
      deleteCliente(selectedCliente.id);
    } else if (accion === "activar") {
      updateCliente(selectedCliente.id, {
        ...selectedCliente,
        activo: true,
      });
    }

    cerrarModal();
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

      {/* MODAL DE CONFIRMACIÓN */}
      <Dialog open={modalOpen} onClose={cerrarModal}>
        <DialogTitle>
          {accion === "desactivar" ? "Desactivar Cliente" : "Activar Cliente"}
        </DialogTitle>

        <DialogContent>
          <Typography>
            {accion === "desactivar"
              ? `¿Estás seguro que deseas desactivar a ${selectedCliente?.nombre} ${selectedCliente?.apellido}?`
              : `¿Deseas activar nuevamente a ${selectedCliente?.nombre} ${selectedCliente?.apellido}?`}
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
