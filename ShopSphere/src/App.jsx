import './App.css'

import { Typography } from '@mui/material'
import Box from '@mui/material/Box'

import ProductCard from './components/Card'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'


import { useEffect, useMemo, useState, useContext } from 'react';

import { ProductContext } from './context/ProductContext'

function App() {
  const [products, setProducts] = useState([])
  // const [searchTerm, setSearchTerm] = useState('')
  const { searchTerm, setSearchTerm } = useContext(ProductContext)
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 1000])

  useEffect(() => {
     async function fetchProducts() {
      const response = await fetch('https://fakestoreapi.com/products')
      // const response = await fetch('https://dummyjson.com/products')

      const data = await response.json();
      // console.log(data);
      
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
  
  const categories = [...new Set(products.map(product => product.category))]
  // const category = [...new Set(products.category)]
  // console.log("category", category);

  function filterCategory(cat) {
    setSelectedCategories((prev) => {

      const alreadySelected = prev.includes(cat)

      if(alreadySelected)
        return prev.filter((item) => item !== cat)

      return [...prev, cat]
    })
  }

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase())

      const matchesCategory =
        selectedCategories.length === 0
          ? true
          : selectedCategories.includes(product.category)

      const [ minPrice, maxPrice ] = selectedPriceRange
      const matchesPriceRange = 
        product.price >= minPrice && 
        product.price <= maxPrice

      // const matchesRating
      return matchesSearch && matchesCategory && matchesPriceRange
    })
  }, [products, debouncedSearch, selectedCategories, selectedPriceRange])

  return (
      <Box sx={{p:2}}>
        {/* <Typography variant='h4' sx={{textAlign:'center', fontWeight:'bold', mb:3}}>ShopSphere</Typography> */}
        <Navbar />
          <Box sx={{display:'flex', flexDirection:'row', mt:6}}>
                <Sidebar
                  categories={categories}
                  selectedCategories={selectedCategories}
                  onCategoryClick={(cat) => filterCategory(cat)}
                  setSelectedPriceRange={setSelectedPriceRange}
                  selectedPriceRange={selectedPriceRange}
                />
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
