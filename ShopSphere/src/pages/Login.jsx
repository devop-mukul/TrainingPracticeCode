import React,{useState} from 'react'
import {Typography, Box, Button, InputAdornment} from '@mui/material'
import {Card, CardMedia} from '@mui/material'
import {TextField} from '@mui/material'

import PersonIcon from '@mui/icons-material/Person'
import LockIcon from '@mui/icons-material/Lock'

import { Link, useNavigate, useLocation } from 'react-router-dom'

import { supabase } from '../utils/supabaseClient'

import {useAuth} from '../context/AuthContext'

export default function Login() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  // const handleLogin = async (email, password) => {
  //   const { data, error } = await supabase.auth.signInWithPassword({email, password,});

  //   if(error) {
  //     console.error('Login error:', error.message);
  //   } else {
  //       console.log('Login successfull', data);
      
  //   }
  // };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    // handleLogin(email, password)
    console.log(email, password);
    
    const result = await signIn(email, password)
    console.log(location);
    
    if(result.ok){
        const redirectTo = location.state?.from?.pathname || '/home'
        navigate(redirectTo, { replace: true})
    } else {
        alert(result.error.message)
    }
  }

    return (
        <Box
            sx={{
                display:'flex', 
                flexDirection:'column', 
                justifyContent:'center', 
                alignItems:'center',
                minHeight:'100vh',
                backgroundColor:'#1e9488'
            }}
        >
            <Card elevation={6}
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    width:{
                      xs:'100%',
                      sm:400,
                      md:500
                    },
                    p:3,
                    borderRadius: 1,
                    // height:400,
                    display:'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                <CardMedia
                    sx={{objectFit: 'contain', pt:0 }}
                    height="100"
                    component="img"
                    image='./logo.jpeg'
                    alt="logo-icon"
                  />
                    <TextField
                        autoFocus
                        fullWidth
                        required
                        autoComplete="username"
                        // sx={{p:2, my:0}}
                        // margin="normal"
                        size="small"
                        placeholder="Email"
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon />
                                    </InputAdornment>
                                )
                            }
                        }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        required
                        autoComplete="current-password"
                        type='password'
                        // sx={{p:2, my:0, mb:0}}
                        // margin="normal"
                        size="small"
                        placeholder="Password"
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon size="small"/>
                                    </InputAdornment>
                                )
                            }
                        }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Typography 
                      variant="subtitle2" 
                      sx={{color:'#9f9f9f', m:0, px:0.5, py:1, cursor:'pointer', textAlign:'right'}}
                      >Forgot Password?</Typography>

                    <Button 
                        type="submit"
                        variant="contained"
                        size="small"
                        sx={{backgroundColor:'#EC6952'}}
                        onClick={handleSubmit}
                        // component={Link}
                        // to='/home'
                    >Log In
                    </Button>

                    <Button 
                        variant="contained"
                        size="small"
                        sx={{backgroundColor:'#26a69a'}}
                    >Click here for Employee Login
                    </Button>
            </Card>
        </Box>
    )
}