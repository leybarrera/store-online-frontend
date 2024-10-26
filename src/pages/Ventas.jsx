// Ventas.jsx
import { useState, useEffect } from "react";
import axios from "axios";

const Ventas = () => {
  const [ventas, setVentas] = useState([]);
  const [newVenta, setNewVenta] = useState({
    clienteId: "",
    productoId: "",
    cantidad: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVentas();
  }, []);

  const fetchVentas = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/ventas");
      setVentas(response.data);
    } catch (err) {
      setError("Error al cargar las ventas");
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVenta({ ...newVenta, [name]: value });
  };

  const addVenta = async () => {
    try {
      await axios.post("http://localhost:3001/api/ventas", newVenta);
      fetchVentas();
      setNewVenta({ clienteId: "", productoId: "", cantidad: "" });
    } catch (err) {
      setError("Error al agregar la venta");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Gestión de Ventas</h2>

      {error && <p className="text-danger">{error}</p>}

      <ul>
        {ventas.length > 0 ? (
          ventas.map((venta) => (
            <li key={venta.id}>
              Cliente: {venta.clienteId} - Producto: {venta.productoId} -
              Cantidad: {venta.cantidad}
            </li>
          ))
        ) : (
          <p>No hay ventas disponibles.</p>
        )}
      </ul>

      <h3>Agregar Venta</h3>
      <input
        type="text"
        name="clienteId"
        placeholder="ID del Cliente"
        value={newVenta.clienteId}
        onChange={handleInputChange}
        className="form-control mb-2"
      />
      <input
        type="text"
        name="productoId"
        placeholder="ID del Producto"
        value={newVenta.productoId}
        onChange={handleInputChange}
        className="form-control mb-2"
      />
      <input
        type="number"
        name="cantidad"
        placeholder="Cantidad"
        value={newVenta.cantidad}
        onChange={handleInputChange}
        className="form-control mb-2"
      />
      <button onClick={addVenta} className="btn btn-primary">
        Agregar Venta
      </button>
    </div>
  );
};

export default Ventas;
