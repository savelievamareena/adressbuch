import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { createTheme, ThemeProvider } from "@mui/material";
import "./styles/index.css";

const theme = createTheme({
    palette: {
        secondary: {
            main: "#707070",
        },
        primary: {
            main: "#02805d",
            contrastText: "#ffffff",
        },
    },
});

createRoot(document.getElementById("root")!).render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>
);
