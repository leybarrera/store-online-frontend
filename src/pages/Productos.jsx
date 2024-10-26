// Productos.jsx
import { useState, useEffect } from "react";
import axios from "axios";

const Productos = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/products");
      setProducts(response.data);
    } catch (err) {
      setError("Error al cargar los productos");
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const addProduct = async () => {
    try {
      await axios.post("http://localhost:3001/api/products", newProduct);
      fetchProducts();
      setNewProduct({ nombre: "", descripcion: "", precio: "", stock: "" });
    } catch (err) {
      setError("Error al agregar el producto");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Gestión de Productos</h2>

      {error && <p className="text-danger">{error}</p>}

      <ul>
        {products.length > 0 ? (
          products.map((product) => (
            <li key={product.id}>
              {product.nombre} - {product.descripcion} - ${product.precio} -
              Stock: {product.stock}
            </li>
          ))
        ) : (
          <p>No hay productos disponibles.</p>
        )}
      </ul>

      <h3>Agregar Producto</h3>
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={newProduct.nombre}
        onChange={handleInputChange}
        className="form-control mb-2"
      />
      <input
        type="text"
        name="descripcion"
        placeholder="Descripción"
        value={newProduct.descripcion}
        onChange={handleInputChange}
        className="form-control mb-2"
      />
      <input
        type="number"
        name="precio"
        placeholder="Precio"
        value={newProduct.precio}
        onChange={handleInputChange}
        className="form-control mb-2"
      />
      <input
        type="number"
        name="stock"
        placeholder="Stock"
        value={newProduct.stock}
        onChange={handleInputChange}
        className="form-control mb-2"
      />
      <button onClick={addProduct} className="btn btn-primary">
        Agregar Producto
      </button>
    </div>
  );
};

export default Productos;
