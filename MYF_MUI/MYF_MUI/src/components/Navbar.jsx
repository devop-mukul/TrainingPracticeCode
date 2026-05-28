import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    Box
} from '@mui/material';

import {Link} from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';

export default function Navbar({ onMenuClick, isDrawerOpen }) {
    return (
        <>
            <AppBar position="fixed">
                <Toolbar>
                    <Box
                        sx={{
                            p: 0.1,
                            my:1.4,
                            display:'flex',
                            alignItems:'center',
                            transition: '0.3s',
                            // marginLeft: open ? `${drawerWidth}px` : '0px',
                            flexGrow: 1
                    }}
                    >
                        {!isDrawerOpen ? (
                            <>
                                <IconButton
                                    size="medium"
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    sx={{ mr:2, ml:6}}
                                    onClick={onMenuClick}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                    {/* {open ? '' : 'Partner Desk'} */}
                                    Partner Desk
                                </Typography>
                            </>
                        ) : ""}
                            
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