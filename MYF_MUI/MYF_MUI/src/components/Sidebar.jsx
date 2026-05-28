import {useState} from 'react'

import {
    IconButton, Typography, Box,
    Drawer, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
    Collapse
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'


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
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

import LocationCityIcon from '@mui/icons-material/LocationCity';
import GarageIcon from '@mui/icons-material/Garage';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import GroupIcon from '@mui/icons-material/Group';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RouteIcon from '@mui/icons-material/Route';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import DnsIcon from '@mui/icons-material/Dns';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import HubIcon from '@mui/icons-material/Hub';
import BadgeIcon from '@mui/icons-material/Badge';
import BusinessIcon from '@mui/icons-material/Business';
import HandshakeIcon from '@mui/icons-material/Handshake';

export default function Sidebar({ open, setOpen }) {
    const drawerWidth = 230
    const [openMenu, setOpenMenu] = useState({})
    const menuItems = [
        {
            id: 'Setup',
            icon: <SettingsIcon />,
            open: true,
            subpath: [
                {
                    id: 'City',
                    icon: <LocationCityIcon />
                },
                {
                    id: 'Dispatch Centers',
                    icon: <GarageIcon />
                },
                {
                    id: 'Vehicles',
                    icon: <DirectionsCarIcon />
                },
                {
                    id: 'Drivers',
                    icon: <GroupIcon />
                }
            ]
        },
        {
            id: 'Dashboard',
            icon: <DashboardIcon />
        },
        {
            id: 'Booking',
            icon: <AddShoppingCartIcon />,
            open: true,
            subpath: [
                {
                    id: 'Bookings V2',
                    icon: <AddShoppingCartIcon />
                },
                {
                    id: 'Boooking Change Requests',
                    icon: <ChangeCircleIcon />
                },
                {
                    id: 'Booking Queries',
                    icon: <QuestionAnswerIcon />
                }
            ]
        },
        {
            id: 'Dispatch',
            icon: <LocalTaxiIcon />,
            open: true,
            subpath: [
                {
                    id: 'Pre Dispatch',
                    icon: <GarageIcon />
                },
                {
                    id: 'Post Dispatch',
                    icon: <CheckCircleIcon />
                },
                {
                    id: 'In Dispatch',
                    icon: <RouteIcon />
                },
                {
                    id: 'Live Monitoring',
                    icon: <VisibilityIcon />
                }
            ]
        },
        {
            id: 'Accounting',
            icon: <AccountBalanceWalletIcon />,
            open: true,
            subpath: [
                {
                    id: 'Receipts',
                    icon: <ReceiptLongIcon />
                },
                {
                    id: 'Invoices',
                    icon: <RequestQuoteIcon />
                },
                {
                    id: 'Memos',
                    icon: <StickyNote2Icon />
                },
                {
                    id: 'SAP System Status',
                    icon: <DnsIcon />
                }
            ]
        },
        {
            id: 'Reports',
            icon: <AssessmentIcon />,
            open: true,
            subpath: [
                {
                    id: 'Templates',
                    icon: <ViewModuleIcon />
                },
                {
                    id: 'Booking Summary',
                    icon: <FactCheckIcon />
                }
            ]
        },
        {
            id: 'Whatsapp Messages',
            icon: <WhatsAppIcon />
        },
        {
            id: 'Market Place',
            icon: <StorefrontIcon />,
            open: true,
            subpath: [
                {
                    id: 'My Market Place',
                    icon: <StorefrontIcon />
                },
                {
                    id: 'My Connections',
                    icon: <HubIcon />
                }
            ]
        },
        {
            id: 'Bulk Upload',
            icon: <DriveFolderUploadIcon />
        },
        {
            id: 'Partners',
            icon: <Diversity1Icon />,
            open: true,
            subpath: [
                {
                    id: 'Client',
                    icon: <BadgeIcon />
                },
                {
                    id: 'Vendor',
                    icon: <BusinessIcon />
                },
                {
                    id: 'Refer Company',
                    icon: <HandshakeIcon />
                }
            ]
        },
        {
            id: 'Log',
            icon: <ArticleIcon />
        },
        // {
        //     id: 'Logout',
        //     icon: <LogoutIcon />
        // }
    ]

    function handleDrawerClose() {
        setOpen(false)
        setOpenMenu({})
    }

    function handleMenuToggle(menuText) {
        setOpenMenu((prev) => ({
            ...prev,
            [menuText] : !prev[menuText]
        }))
        // setOpen(!open)
    }

    return (
        <>
            <Drawer 
                anchor='left' 
                open={open} 
                onClose={() => setOpen(false)} 
                variant='permanent'//mind this
                sx={{
                    widthOpen : open ? drawerWidth : "50px",
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        overflowX:'hidden',
                        transition:'0.2s',
                        width: open ? drawerWidth : "50px"
                    }
                }}
            >
                {open ? (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems:'center'
                            // p: 0.5
                        }}
                    >
                    <Typography variant="h6" sx={{p:2, fontWeight:'bold', whiteSpace:'nowrap'}}>Partner Desk</Typography>
                        <IconButton onClick={handleDrawerClose} sx={{p:1,mr:1.5}}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Box>
                ) : <Typography variant="h6" sx={{p:2, fontWeight:'bold', whiteSpace:'nowrap'}}>Partner Desk</Typography>}
                
                <Divider />

                {/* Drawer Menu */}
                {/* <Box sx={{width:drawerWidth}}> */}
                    <List sx={{display:'flex', flexDirection:'column'}}> 
                        {/* sx= {{ height:'100%', mt:'auto' }} -> ye logout ko last me attach krdega*/} 
                        {menuItems.map((item) => (
                        <Box key={item.id}>
                            <ListItem key={item.id} disablePadding
                                onClick={() => {
                                    if(item.subpath) {
                                        handleMenuToggle(item.id)
                                    }
                                }}
                            >
                                <ListItemButton>
                                    <ListItemIcon sx={{flexShrink:0}}
                                    >
                                        {item.icon}
                                    </ListItemIcon>
                                    {open && (
                                        <ListItemText 
                                            primary={item.id}
                                            sx={{
                                                whiteSpace:'nowrap'
                                            }}
                                        />
                                    )}
                                    {open && item.subpath && (
                                        openMenu[item.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />
                                    )}
                                </ListItemButton>
                            </ListItem>
                            
                            <Collapse
                                in={openMenu[item.id]}
                                timeout="auto"
                                unmountOnExit
                            >
                                <List disablePadding>
                                    {item.subpath?.map((subitem) => (
                                        <ListItem
                                        disablePadding
                                        key={subitem.id}
                                        sx={{ pl: 2 }}
                                        >
                                            <ListItemButton>
                                                {/* {console.log(subitem)} */}
                                                <ListItemIcon sx={{flexShrink:0}}>{subitem.icon}</ListItemIcon>
                                                <ListItemText
                                                    sx={{
                                                        whiteSpace:'nowrap'
                                                    }}
                                                    primary={subitem.id}
                                                />
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </List>
                            </Collapse>
                        </Box>
                        ))}
                        {/* </Box> */}
                        <Divider />
                        {/* <ListItem disablePadding> */}
                            <ListItemButton>
                                <ListItemIcon sx={{flexShrink:0}}>
                                    <LogoutIcon />
                                </ListItemIcon>
                                <ListItemText primary="Logout">
                                </ListItemText>
                            </ListItemButton>
                        {/* </ListItem> */}
                    </List>
            </Drawer>
        </>
    )
}