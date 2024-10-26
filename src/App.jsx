import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Clientes from "./pages/Clientes"; // Importamos los componentes de cada sección
import Ventas from "./pages/Ventas";
import Pagos from "./pages/Pagos";
import Productos from "./pages/Productos";

const AdminPanel = () => {
  const [section, setSection] = useState("clientes");

  const renderSection = () => {
    switch (section) {
      case "clientes":
        return <Clientes />;
      case "ventas":
        return <Ventas />;
      case "pagos":
        return <Pagos />;
      case "productos":
        return <Productos />;
      default:
        return <Clientes />;
    }
  };

  return (
    <div>
      {/* Barra de Navegación */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">
          Admin Panel
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link ${
                  section === "clientes" ? "active" : ""
                }`}
                onClick={() => setSection("clientes")}
              >
                Clientes
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link ${
                  section === "ventas" ? "active" : ""
                }`}
                onClick={() => setSection("ventas")}
              >
                Ventas
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link ${
                  section === "pagos" ? "active" : ""
                }`}
                onClick={() => setSection("pagos")}
              >
                Pagos
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link ${
                  section === "productos" ? "active" : ""
                }`}
                onClick={() => setSection("productos")}
              >
                Productos
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Sección Activa */}
      <div className="container mt-4">{renderSection()}</div>
    </div>
  );
};

export default AdminPanel;
