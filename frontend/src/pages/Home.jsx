import { Typography, Paper, Box } from "@mui/material";

export default function Home() {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Bienvenido a TitanGymApp 🏋️‍♂️
      </Typography>
      <Typography>
        Usá el menú lateral para navegar entre las secciones.
      </Typography>
    </Paper>
  );
}
