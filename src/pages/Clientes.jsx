// Clientes.jsx
import { useState, useEffect } from "react";
import axios from "axios";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [newCliente, setNewCliente] = useState({
    nombre: "",
    email: "",
    telefono: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/clientes");
      setClientes(response.data);
    } catch (err) {
      setError("Error al cargar los clientes");
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCliente({ ...newCliente, [name]: value });
  };

  const addCliente = async () => {
    try {
      await axios.post("http://localhost:3001/api/clientes", newCliente);
      fetchClientes();
      setNewCliente({ nombre: "", email: "", telefono: "" });
    } catch (err) {
      setError("Error al agregar el cliente");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Gestión de Clientes</h2>

      {error && <p className="text-danger">{error}</p>}

      <ul>
        {clientes.length > 0 ? (
          clientes.map((cliente) => (
            <li key={cliente.id}>
              {cliente.nombre} - {cliente.email} - {cliente.telefono}
            </li>
          ))
        ) : (
          <p>No hay clientes disponibles.</p>
        )}
      </ul>

      <h3>Agregar Cliente</h3>
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={newCliente.nombre}
        onChange={handleInputChange}
        className="form-control mb-2"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={newCliente.email}
        onChange={handleInputChange}
        className="form-control mb-2"
      />
      <input
        type="text"
        name="telefono"
        placeholder="Teléfono"
        value={newCliente.telefono}
        onChange={handleInputChange}
        className="form-control mb-2"
      />
      <button onClick={addCliente} className="btn btn-primary">
        Agregar Cliente
      </button>
    </div>
  );
};

export default Clientes;
