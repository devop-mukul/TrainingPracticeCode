import './App.css'


import Box from '@mui/material/Box'
import { useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import ProductCard from './components/Card'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import { ProductContext } from './context/ProductContext'
import About from './pages/About'

function Home() {
  const { filteredProducts } = useContext(ProductContext)
  return (
    <Box sx={{ display:'flex', flexDirection:'row' }}>
      <Sidebar />
      <Box sx={{ display:'flex', flexWrap:'wrap', gap:2, p:2, justifyContent:'center' }}>
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            title={product.title}
            description={product.description}
            price={product.price}
            rating={product.rating}
          />
        ))}
      </Box>
    </Box>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Box sx={{ p: 2, pt: '72px', bgcolor: 'background.default'}}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Box>
    </BrowserRouter>
  )
}

export default App
