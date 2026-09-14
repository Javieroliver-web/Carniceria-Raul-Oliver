import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
// Fuentes autoalojadas: se sirven desde la propia web en vez de desde Google
// Fonts, así la visita no manda la IP del cliente a un tercero.
import "@fontsource-variable/inter/wght.css";
import "@fontsource-variable/playfair-display/wght.css";
import "@fontsource-variable/playfair-display/wght-italic.css";
import "./styles/index.css";

const container = document.getElementById("root");
if (!container) throw new Error('No se encontró el contenedor #root en index.html');

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>
);
