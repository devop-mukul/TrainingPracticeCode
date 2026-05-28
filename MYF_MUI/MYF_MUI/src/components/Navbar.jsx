import React, { useState } from 'react';
import {
    AppBar, Toolbar, IconButton, Typography, Button, Box,
    Drawer, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
    Select,
    Collapse
} from '@mui/material';

import {ExpandMore} from '@mui/icons-material'

import {Link} from 'react-router-dom'

import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AssessmentIcon from '@mui/icons-material/Assessment';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import StorefrontIcon from '@mui/icons-material/Storefront';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import ArticleIcon from '@mui/icons-material/Article';
import LogoutIcon from '@mui/icons-material/Logout';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import StarBorder from '@mui/icons-material/StarBorder';

export default function LoggedHome() {
    const [open, setOpen] = useState(false)
    const drawerWidth = 230
    const menuItems = [
        {
            text: 'Setup',
            icon: <SettingsIcon />
        },
        {
            text: 'Dashboard',
            icon: <DashboardIcon />
        },
        {
            text: 'Booking',
            icon: <AddShoppingCartIcon />,
            subpath: [
                {
                    text: 'Bookings V2',
                    icon: <StarBorder />
                },
                {
                    text: 'Boooking Change Requests',
                    icon: <StarBorder />
                },
                {
                    text: 'Booking Queries',
                    icon: <StarBorder />
                }
            ]
        },
        {
            text: 'Dispatch',
            icon: <LocalTaxiIcon />
        },
        {
            text: 'Accounting',
            icon: <AccountBalanceWalletIcon />
        },
        {
            text: 'Reports',
            icon: <AssessmentIcon />
        },
        {
            text: 'Whatsapp Messages',
            icon: <WhatsAppIcon />
        },
        {
            text: 'Market Place',
            icon: <StorefrontIcon />
        },
        {
            text: 'Bulk Upload',
            icon: <DriveFolderUploadIcon />
        },
        {
            text: 'Partners',
            icon: <Diversity1Icon />
        },
        {
            text: 'Log',
            icon: <ArticleIcon />
        },
        // {
        //     text: 'Logout',
        //     icon: <LogoutIcon />
        // }
    ]
    return (
        <>
            <AppBar position="fixed">
                <Toolbar>
                    <Drawer 
                        anchor='left' 
                        open={open} 
                        onClose={() => setOpen(false)} 
                        variant='temporary'//mind this
                        sx={{
                            // widthOpen : open ? drawerWidth : 10,
                            flexShrink: 0,
                            '& .MuiDrawer-paper': {
                                transition:'0.8s',
                                width: open ? drawerWidth : 10
                            }
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems:'center'
                                // p: 0.5
                            }}
                        >
                        <Typography variant="h6" sx={{p:2, fontWeight:'bold'}}>Partner Desk</Typography>
                            <IconButton onClick={() => setOpen(false)} sx={{p:1,mr:2}}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </Box>
                        <Divider />
                        <Box sx={{width:drawerWidth}}>
                            <List>
                                {menuItems.map((item) => (
                                    <ListItem key={item.text} disablePadding>
                                        <ListItemButton>
                                            <ListItemIcon
                                            >
                                                {item.icon}
                                            </ListItemIcon>
                                            {open && (
                                                <ListItemText primary={item.text}/>
                                            ) 
                                            }
                                            {/* {item.subpath?.map((subitem) => (
                                                <ListItemIcon>
                                                    {subitem.icon}
                                                </ListItemIcon>
                                                <ListItemText primary={subitem.text}/>
                                            ))} */}
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                        <Divider />
                        <ListItemButton>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary="Logout">
                            </ListItemText>
                        </ListItemButton>
                    </Drawer>
                    <Box
                        sx={{
                            p: 1,
                            display:'flex',
                            alignItems:'center',
                            transition: '0.3s',
                            // marginLeft: open ? `${drawerWidth}px` : '0px',
                            flexGrow: 1
                    }}
                    >
                        <IconButton
                            size="medium"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={() => setOpen(!open)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            {open ? '' : 'Partner Desk'}
                        </Typography>
                    </Box>
                    <Button 
                        component={Link}
                        to='/'
                        color="inherit"
                    >Login</Button>
                </Toolbar>
                
            </AppBar>
        </>
    )
}