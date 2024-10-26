// Pagos.jsx
import { useState, useEffect } from "react";
import axios from "axios";

const Pagos = () => {
  const [pagos, setPagos] = useState([]);
  const [newPago, setNewPago] = useState({
    clienteId: "",
    monto: "",
    fecha: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPagos();
  }, []);

  const fetchPagos = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/pagos");
      setPagos(response.data);
    } catch (err) {
      setError("Error al cargar los pagos");
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPago({ ...newPago, [name]: value });
  };

  const addPago = async () => {
    try {
      await axios.post("http://localhost:3001/api/pagos", newPago);
      fetchPagos();
      setNewPago({ clienteId: "", monto: "", fecha: "" });
    } catch (err) {
      setError("Error al agregar el pago");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Gestión de Pagos</h2>

      {error && <p className="text-danger">{error}</p>}

      <ul>
        {pagos.length > 0 ? (
          pagos.map((pago) => (
            <li key={pago.id}>
              Cliente: {pago.clienteId} - Monto: ${pago.monto} - Fecha:{" "}
              {pago.fecha}
            </li>
          ))
        ) : (
          <p>No hay pagos disponibles.</p>
        )}
      </ul>

      <h3>Agregar Pago</h3>
      <input
        type="text"
        name="clienteId"
        placeholder="ID del Cliente"
        value={newPago.clienteId}
        onChange={handleInputChange}
        className="form-control mb-2"
      />
      <input
        type="number"
        name="monto"
        placeholder="Monto"
        value={newPago.monto}
        onChange={handleInputChange}
        className="form-control mb-2"
      />
      <input
        type="date"
        name="fecha"
        value={newPago.fecha}
        onChange={handleInputChange}
        className="form-control mb-2"
      />
      <button onClick={addPago} className="btn btn-primary">
        Agregar Pago
      </button>
    </div>
  );
};

export default Pagos;
