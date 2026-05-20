import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

import { CartContextProvider } from './context/CartContext'
import Header from './components/Header'
import ProductList from './components/ProductList'

function App() {

  return (
    <CartContextProvider>
      <Header />
      <ProductList />
    </CartContextProvider>
  )
}

export default App;
