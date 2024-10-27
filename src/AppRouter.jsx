import { Routes, Route } from 'react-router-dom'
import Clientes from './pages/Clientes'
import Pagos from './pages/Pagos'
import Productos from './pages/Productos'
import Ventas from './pages/Ventas'
import Error404 from './pages/Error404'
import Home from './pages/Home'
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/clientes" element={<Clientes />} />
      <Route path="/pagos" element={<Pagos />} />
      <Route path="/productos" element={<Productos />} />

      <Route path="/ventas" element={<Ventas />} />

      <Route path="*" element={<Error404 />} />
    </Routes>
  )
}

export default AppRouter
