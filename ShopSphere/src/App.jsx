import './App.css'

import Box from '@mui/material/Box'
import { useContext } from 'react'
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom'

// import ProductCard from './components/Card'
// import Sidebar from './components/Sidebar'
// import { ProductContext } from './context/ProductContext'
// import Navbar from './components/Navbar'

import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Cart from './pages/Cart'
import PaymentPage from './pages/PaymentPage'

function App() {
  return (
    <>
      <Box sx={{ p: 2, pt: '72px', bgcolor: 'background.default'}}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<PaymentPage />} />
          </Routes>
      </Box>
    </>
  )
}

export default App
