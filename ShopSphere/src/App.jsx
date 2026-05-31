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
import ProductDetails from './pages/ProductDetails'
import NotFound from './pages/NotFound'

import SignUp from './pages/SignUp'

import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <>
      {/* <Box sx={{ p: 2, pt: '72px', bgcolor: 'background.default'}}> */}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            <Route element={<PrivateRoute />}>
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/product/:id" element={<ProductDetails />} />
            </Route>
              <Route path="*" element={<NotFound />} />
          </Routes>
      {/* </Box> */}
    </>
  )
}

export default App
