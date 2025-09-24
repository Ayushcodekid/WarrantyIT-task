import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import LandingPage from './pages/LandingPage'
import ProductForm from './pages/ProductForm'

function App() {

  return (
    <>
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/productsForm" element={<ProductForm />} />
      </Routes>
    </>
  )
}

export default App
