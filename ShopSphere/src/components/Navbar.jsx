import React from 'react'
import { Typography, Box, Button } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TextField from '@mui/material/TextField';

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'

export default function Navbar({ searchTerm, setSearchTerm }) {
    return (
        <Box sx={{
            position:'sticky',
            top:0, left:0, right: 0,
            zIndex: 1300,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 1,
            borderBottom: '1px solid lightgray',
            mb: 2,
            backgroundColor: 'white',
        }}>
            <Typography variant="h4" fontWeight='bold'>ShopSphere</Typography>
            {/* <Box>Search</Box> */}
            <TextField 
                id="searchProducts" 
                label="Search..." 
                variant="outlined" 
                size="small"
                value={searchTerm}
                onChange={(e) => {setSearchTerm(e.target.value)}}/>
            <Button variant="contained" startIcon={<ShoppingCartIcon/>}>Cart</Button>
        </Box>
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