import { useState, useEffect } from 'react'
import './App.css'

import {Typography} from '@mui/material'

function App() {

  const [price, setPrice] = useState(null)
  useEffect(() => {
    async function fetchPrice() {
      try {
        // TODO: Replace with your actual API endpoint
        const response = await fetch('https://fuel.indianapi.in/live_fuel_price?fuel_type=diesel&location_type=state');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setPrice(data);
        console.log(data);
      } catch (error) {
        console.error('Failed to fetch price:', error);
        setPrice({ error: 'Failed to fetch price' });
      }
    }
    fetchPrice();
  }, []);
  return (
    <>
      <Typography variant="h4" gutterBottom>Fuel Price</Typography>
      {price === null && <Typography>Loading...</Typography>}
      {price && price.error && <Typography color="error">{price.error}</Typography>}
      {price && !price.error && (
        <pre style={{ textAlign: 'left' }}>{JSON.stringify(price, null, 2)}</pre>
      )}
    </>
  );
}

export default App
