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

import PersonIcon from '@mui/icons-material/Person';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

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
            borderBottom: '1px solid lightgray',
            backgroundColor: 'primary.light',
        }}>
            <Toolbar
                sx={{
                    display:'flex',
                    justifyContent:'space-between',
                    alignItems:'center',
                    gap: 3
                }}
            >
                <Box
                >
                    <Stack direction='row' spacing={1}
                        sx={{
                            display:'flex',
                            alignItems:'center',
                            gap:2
                        }}
                        >
                            <Typography variant="h4" sx={{color:'white', fontWeight:'bold'}}>ShopSphere</Typography>
                            <Button 
                                component={Link}
                                to='/' 
                                variant="text" 
                                sx={{color:'primary.contrastText'}}>Home</Button>
                            <Button 
                                component={Link}
                                to='/about'
                                variant="text" 
                                sx={{color:'primary.contrastText'}}>About</Button>
                            <Button 
                                variant="text" 
                                sx={{color:'primary.contrastText'}}
                                endIcon={<ArrowDropDownIcon />}>Categories</Button>
                    </Stack>
                </Box>
                <Box
                    sx={{display:'flex',
                        flexGrow:1,
                        justifyContent:'center'
                    }}
                >
                    <TextField 
                        id="searchProducts" 
                        label="Search..." 
                        variant="outlined" 
                        size="small"
                        value={searchTerm}
                        sx={{
                            backgroundColor:'white', 
                            borderRadius: 1, 
                            maxWidth:'500px', 
                            width:'100%'
                        }}
                        onChange={(e) => {setSearchTerm(e.target.value)}}/>
                </Box>
                <Box>
                    <Stack direction='row' spacing={2} alignItems="center">
                        <Button 
                            sx={{color:'white'}}
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
                        <Button startIcon={<PersonIcon />} sx={{color:'white'}}>
                            Login
                        </Button>
                    </Stack>
                </Box>
            </Toolbar>
        </AppBar>
    );
}