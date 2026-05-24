import './App.css'

import { Typography } from '@mui/material'
import Box from '@mui/material/Box'

import ProductCard from './components/Card'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'

import {useEffect, useState} from 'react';

function App() {
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  useEffect(() => {
     async function fetchProducts() {
      const response = await fetch('https://fakestoreapi.com/products')
      // const response = await fetch('https://dummyjson.com/products')

      const data = await response.json();
      console.log(data);
      
      setProducts(data);
    }
    fetchProducts();
  }, [])

  useEffect(() => {
    const timer = setTimeout(() =>{
      setDebouncedSearch(searchTerm)
    }, 300)

    return () => {
      clearTimeout(timer)
    }
  }, [searchTerm])

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(debouncedSearch.toLowerCase())
  )

  return (
      <Box sx={{p:2}}>
        {/* <Typography variant='h4' sx={{textAlign:'center', fontWeight:'bold', mb:3}}>ShopSphere</Typography> */}
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
          <Box sx={{display:'flex', flexDirection:'row'}}>
              <Sidebar />
              <Box sx={{ display:'flex', flexWrap:'wrap', gap:2, p:2, justifyContent:'center'}}>
                {filteredProducts.map((product) => (
                //() - implicit return krta hai, {} - explicit return krna padta hai
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
  );
}

export default App
