import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./contexts/authContext/index.jsx";
import { VenuesContextProvider } from "./contexts/venuesContext/index.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContextProvider>
      <VenuesContextProvider>
        <App />
      </VenuesContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
