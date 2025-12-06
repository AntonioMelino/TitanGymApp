import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Typography, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PaymentIcon from "@mui/icons-material/Payment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import { useNavigate } from "react-router-dom";
import usePagos from "../hooks/usePagos";

export default function PagosList() {
  const { pagos, loading, error } = usePagos();
  const navigate = useNavigate();

  if (error) return <p>Error: {error}</p>;

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "clienteId", headerName: "ID Cliente", width: 120 },
    {
      field: "monto",
      headerName: "Monto",
      width: 150,
      renderCell: (params) => `$ ${params.value}`,
    },
    {
      field: "fechaPago",
      headerName: "Fecha Pago",
      width: 150,
      renderCell: (params) =>
        params.value ? params.value.substring(0, 10) : "-",
    },
    {
      field: "estado",
      headerName: "Estado",
      width: 140,
      renderCell: (params) =>
        params.value === "Pagado" ? (
          <Stack direction="row" alignItems="center" spacing={1}>
            <CheckCircleIcon color="success" fontSize="small" />
            Pagado
          </Stack>
        ) : (
          <Stack direction="row" alignItems="center" spacing={1}>
            <HourglassEmptyIcon color="warning" fontSize="small" />
            Pendiente
          </Stack>
        ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography
          variant="h5"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <PaymentIcon /> Pagos
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/pagos/nuevo")}
        >
          Nuevo Pago
        </Button>
      </Stack>

      <div style={{ height: 500, width: "100%" }}>
        <DataGrid rows={pagos} columns={columns} loading={loading} />
      </div>
    </Box>
  );
}
