import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Home, People } from "@mui/icons-material";
import { Link } from "react-router-dom";

const drawerWidth = 240;

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Inicio" />
        </ListItem>

        <ListItem button component={Link} to="/clientes">
          <ListItemIcon>
            <People />
          </ListItemIcon>
          <ListItemText primary="Clientes" />
        </ListItem>
      </List>
    </Drawer>
  );
}
