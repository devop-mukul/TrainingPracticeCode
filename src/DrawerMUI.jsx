import React, {useState} from 'react'
import { Typography, Button, Box, Divider } from '@mui/material'
import { Drawer, SwipeableDrawer } from '@mui/material'
import { List, ListItem, ListItemButton, ListItemText, ListItemIcon } from '@mui/material'

// import {HomeIcon, PersonIcon, SettingsIcon, LogoutIcon} from '@mui/icons-material'
import HomeIcon from '@mui/icons-material/Home'
import PersonIcon from '@mui/icons-material/Person'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'

export default function DrawerMUI() {
    const [open, setOpen] = useState(false)
    const drawerWidth = 250
    const menuItems = [
        {
            text:'Home',
            icon: <HomeIcon />
        },
        {
            text:'Profile',
            icon: <PersonIcon />
        },
        {
            text:'Settings',
            icon: <SettingsIcon />
        },
        {
            text:'Logout',
            icon: <LogoutIcon />
        }
    ]
    return (
        <Box>
            <Drawer 
                anchor='left' 
                open={open} 
                onClose={() => setOpen(false)} 
                variant='permanent'//mind this
                sx={{
                    widthOpen : open ? drawerWidth : 60,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        transition:'0.3s',
                        width: open ? drawerWidth : 60
                    }
                }}
            >
                <Box sx={{width:drawerWidth}}>
                    <Typography variant="h6" sx={{p:2, fontWeight:'bold'}}>Side Panel</Typography>
                    <Divider />
                    <List>
                        {menuItems.map((item) => (
                            <ListItem key={item.text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {item.icon}
                                    </ListItemIcon>
                                    {open && (
                                        <ListItemText primary={item.text}/>
                                    )}
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
            <Box
                sx={{
                    p: 2,
                    transition: '0.3s',
                    marginLeft: open ? `${drawerWidth}px` : '60px'
                }}
            >
                <Typography variant="h4">Drawer MUI</Typography>
                <Button 
                    variant="contained" 
                    onClick={() => setOpen(!open)}
                >
                    Open Drawer
                </Button>
            </Box>
        </Box>
    )
}