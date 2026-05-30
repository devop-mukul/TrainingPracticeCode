import Navbar from '../components/Navbar'
import {Box} from '@mui/material'

export default function About() {
  return (
    <div style={{padding: 32}}>
      <Navbar />
      <Box sx={{pt:10, pl:2}}>
        <h2>About ShopSphere</h2>
        <p>This is a demo about page. Routing is working!</p>
      </Box>
    </div>
  );
}
