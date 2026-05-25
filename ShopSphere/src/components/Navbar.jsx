import React, { useContext } from 'react'
import { Typography, Box, Button } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TextField from '@mui/material/TextField';

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'

import { ProductContext } from '../context/ProductContext'

export default function Navbar() {
    const { searchTerm, setSearchTerm } = useContext(ProductContext)
    return (
        <AppBar sx={{
            position:'fixed',
            top:0, left:0, right: 0,
            zIndex: 1300,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 1,
            borderBottom: '1px solid lightgray',
            mb: 0,
            backgroundColor: 'white',
        }}>
            <Typography variant="h4" fontWeight='bold' sx={{color:'black'}}>ShopSphere</Typography>
            {/* <Box>Search</Box> */}
            <TextField 
                id="searchProducts" 
                label="Search..." 
                variant="outlined" 
                size="small"
                value={searchTerm}
                sx={{backgroundColor:'white', borderRadius:2, boxShadow:5}}
                onChange={(e) => {setSearchTerm(e.target.value)}}/>
            <Button variant="contained" startIcon={<ShoppingCartIcon/>}>Cart</Button>
        </AppBar>
            // <AppBar position="static">
            //     <Toolbar sx={{justifyContent:'space-between'}}>
            //         <Typography variant="h4" fontWeight='bold' component="div" sx={{ flexGrow: 1 }}>
            //             ShopSphere
            //         </Typography>
            //         <Box>
            //             <TextField 
            //                 id="searchProducts" 
            //                 label="Search..." 
            //                 variant="outlined" 
            //                 size="small"
            //                 value={searchTerm}
            //                 onChange={(e) => {setSearchTerm(e.target.value)}}/>
            //             <Button color="success" variant='contained' startIcon={<ShoppingCartIcon/>}>Cart</Button>
            //         </Box>
            //     </Toolbar>
            // </AppBar>
    );
}