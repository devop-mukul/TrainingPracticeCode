import './App.css'

import Box from '@mui/material/Box'
import { useContext } from 'react'

import ProductCard from './components/Card'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import { ProductContext } from './context/ProductContext'

function App() {
  const { filteredProducts } = useContext(ProductContext)

  return (
      <Box sx={{ p: 2, pt: '72px' }}>
        <Navbar />
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
      </Box>
  )
}

export default App
