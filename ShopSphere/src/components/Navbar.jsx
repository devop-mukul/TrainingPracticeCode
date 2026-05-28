import React, { useContext } from 'react'
import { Typography, Box, Button, Stack } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TextField from '@mui/material/TextField';

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Badge, { badgeClasses } from '@mui/material/Badge';

import { ProductContext } from '../context/ProductContext'
import { CartContext } from '../context/CartContext'

import {Link} from 'react-router-dom'

import { styled } from '@mui/material/styles';

export default function Navbar() {
    const { searchTerm, setSearchTerm } = useContext(ProductContext)
    const { totalItems } = useContext(CartContext)
    const CartBadge = styled(Badge)(({ theme }) => ({
        [`& .${badgeClasses.badge}`]: {
            top: -0.5,
            right: 3,
            fontSize: '0.7rem',
            padding: '0 1px',
            minWidth: '18px',
            height: '18px',
        },
    }));
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
            backgroundColor: 'primary.light',
        }}>
            <Typography variant="h4" sx={{color:'white', fontWeight:'bold', textShadow:'2px 2px 2px black'}}>ShopSphere</Typography>
            <Stack direction='row'>
                <Button 
                    component={Link}
                    to='/' 
                    variant="text" 
                    sx={{color:'primary.contrastText', textShadow:'2px 2px 2px black'}}>Home</Button>
                <Button 
                    component={Link}
                    to='/about'
                    variant="text" 
                    sx={{color:'primary.contrastText', textShadow:'2px 2px 2px black'}}>About</Button>
            </Stack>
            <TextField 
                id="searchProducts" 
                label="Search..." 
                variant="outlined" 
                size="small"
                value={searchTerm}
                sx={{backgroundColor:'white', borderRadius:1}}
                onChange={(e) => {setSearchTerm(e.target.value)}}/>
            <Button 
                component={Link}
                to='/cart'
                variant="text" 
                startIcon={
                    <CartBadge
                        badgeContent={totalItems}
                        color="error"
                        overlap="circular"
                    >
                        <ShoppingCartIcon />
                    </CartBadge>
                }
            >Cart</Button>
        </AppBar>
    );
}