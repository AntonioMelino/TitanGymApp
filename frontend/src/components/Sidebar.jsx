import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import {
  Home,
  People,
  SportsGymnastics,
  Paid, // 👈 NUEVO ÍCONO PARA PAGOS
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

const drawerWidth = 240;

export default function Sidebar() {
  const theme = useTheme();
  const location = useLocation();

  const textColor = theme.palette.mode === "light" ? "#000000" : "#FFFFFF";
  const bgColor =
    theme.palette.mode === "light" ? "#ffffff" : theme.palette.background.paper;

  const activeStyle = {
    backgroundColor:
      theme.palette.mode === "light" ? "#f0f0f0" : "rgba(255,255,255,0.1)",
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: bgColor,
          color: textColor,
        },
      }}
    >
      <List>
        {/* INICIO */}
        <ListItemButton
          component={Link}
          to="/"
          sx={{
            color: textColor,
            ...(location.pathname === "/" && activeStyle),
          }}
        >
          <ListItemIcon sx={{ color: textColor }}>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Inicio" />
        </ListItemButton>

        {/* CLIENTES */}
        <ListItemButton
          component={Link}
          to="/clientes"
          sx={{
            color: textColor,
            ...(location.pathname === "/clientes" && activeStyle),
          }}
        >
          <ListItemIcon sx={{ color: textColor }}>
            <People />
          </ListItemIcon>
          <ListItemText primary="Clientes" />
        </ListItemButton>

        {/* ENTRENADORES */}
        <ListItemButton
          component={Link}
          to="/entrenadores"
          sx={{
            color: textColor,
            ...(location.pathname === "/entrenadores" && activeStyle),
          }}
        >
          <ListItemIcon sx={{ color: textColor }}>
            <SportsGymnastics />
          </ListItemIcon>
          <ListItemText primary="Entrenadores" />
        </ListItemButton>

        {/* PAGOS */}
        <ListItemButton
          component={Link}
          to="/pagos"
          sx={{
            color: textColor,
            ...(location.pathname === "/pagos" && activeStyle),
          }}
        >
          <ListItemIcon sx={{ color: textColor }}>
            <Paid />
          </ListItemIcon>
          <ListItemText primary="Pagos" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}
