import React, {useContext} from 'react'
import {Box} from '@mui/material'

import {ProductContext} from '../context/ProductContext'
import ProductCard from '../components/Card'

import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

export default function Home() {

  const { filteredProducts } = useContext(ProductContext)

  return (
    <Box sx={{ display:'flex', flexDirection:'row', pt:10, pl:5 }}>
      <Navbar />
      <Sidebar />
      <Box sx={{ display:'flex', flexWrap:'wrap', gap:2, p:2, justifyContent:'center' }}>
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            productId={product.id}
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