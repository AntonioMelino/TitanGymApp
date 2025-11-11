import { Box, AppBar, Toolbar, Typography } from "@mui/material";
import Sidebar from "../components/Sidebar";
import ThemeToggle from "../components/ThemeToggle";

export default function DashboardLayout({ children }) {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ mb: 2 }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">TitanGymApp</Typography>
            <ThemeToggle />
          </Toolbar>
        </AppBar>

        <Box sx={{ p: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
}
