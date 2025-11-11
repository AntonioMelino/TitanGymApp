import { useContext } from "react";
import { IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { ColorModeContext } from "../ThemeContext";
import { useTheme } from "@mui/material/styles";

export default function ThemeToggle() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <IconButton color="inherit" onClick={colorMode.toggleColorMode}>
      {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
}
