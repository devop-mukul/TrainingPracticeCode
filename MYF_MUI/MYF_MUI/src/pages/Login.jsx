import React from 'react'
import {Typography, Box, Button, InputAdornment} from '@mui/material'
import {Card, CardMedia} from '@mui/material'
import {TextField} from '@mui/material'

import PersonIcon from '@mui/icons-material/Person'
import LockIcon from '@mui/icons-material/Lock'

import {Link} from 'react-router-dom'

export default function Login() {
    return (
        <Box
            sx={{
                display:'flex', 
                flexDirection:'column', 
                justifyContent:'center', 
                alignItems:'center',
                height:'100vh',
                backgroundColor:'#1e9488'
            }}
        >
            <Card
                sx={{
                    width:500,
                    height:400,
                    display:'flex',
                    flexDirection:'column', 
                    // gap:1
                    // justifyContent:'center',
                    //  vertical center nahi chahiye
                    // alignItems:'left'
                }}
            >
                <CardMedia
                    sx={{objectFit: 'contain', pt:2 }}
                    height="50"
                    component="img"
                    image='./myficon.png'
                    alt="myf-icon"
                />
                <TextField
                    autoFocus
                    autoComplete={true}
                    sx={{p:2, my:0}}
                    margin="normal"
                    size="small"
                    placeholder="Email or Username"
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonIcon />
                                </InputAdornment>
                            )
                        }
                    }}
                />
                <TextField
                    autoComplete={true}
                    type='password'
                    sx={{p:2, my:0, mb:0}}
                    // margin="normal"
                    size="small"
                    placeholder="Email or Username"
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon size="medium"/>
                                </InputAdornment>
                            )
                        }
                    }}
                />

                <Typography variant="subtitle2" sx={{color:'#9f9f9f', m:0, px:2, py:1}}>Forgot Password?</Typography>

                <Button 
                    variant="contained"
                    size="small"
                    sx={{mx:2, mt:2, backgroundColor:'#EC6952'}}
                    component={Link}
                    to='/loggedHome'
                >Log In
                </Button>

                <Button 
                    variant="contained"
                    size="small"
                    sx={{mt:2, m:2, backgroundColor:'#26a69a'}}
                >Click here for Employee Login
                </Button>
            </Card>
        </Box>
    )
}