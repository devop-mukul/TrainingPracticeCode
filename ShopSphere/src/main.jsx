import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CssBaseline, ThemeProvider } from '@mui/material'
// import './index.css'
import App from './App.jsx'

import {BrowserRouter} from 'react-router-dom'

import { ProductProvider } from './context/ProductContext'
import { CartProvider } from './context/CartContext'
import {AuthProvider} from './context/AuthContext'

import theme from './theme'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <ProductProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </ProductProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
