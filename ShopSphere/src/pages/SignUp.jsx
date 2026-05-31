import React,{useState} from 'react'
import {Typography, Box, Button, InputAdornment} from '@mui/material'
import {Card, CardMedia} from '@mui/material'
import {TextField, IconButton} from '@mui/material'
import { Snackbar, Alert } from '@mui/material'

import PersonIcon from '@mui/icons-material/Person'
import LockIcon from '@mui/icons-material/Lock'

import { useNavigate, useLocation } from 'react-router-dom'

import {useAuth} from '../context/AuthContext'

import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function Login() {
  const { signUp, loading } = useAuth()
  const navigate = useNavigate()
//   const location = useLocation()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visibility, setVisibility] = useState(false)
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'info',
    })

  async function handleSubmit(e) {
    e.preventDefault();
    // handleLogin(email, password)
    // console.log(email, password);
    
    const result = await signUp(email, password, fullName)
    
    if(!result.ok){
        setSnackbar({
            open: true,
            message: result.error?.message || 'Signup failed',
            severity: 'error',
        })
        return
    } 

    if(!result.data?.session) {
        setSnackbar({
            open: true,
            message: 'Account created. Please verify your email to login!',
            severity: 'success',
        })
        setTimeout(() => {
            navigate('/')
        }, 1200)
        return
    }

    navigate('/home', {replace: true})
  }

  function handleSnackbarClose(_event, reason) {
    if (reason === 'clickaway') return
    setSnackbar((prev) => ({ ...prev, open: false }))
  }

  function passwordVisibility() {
    return visibility ? <VisibilityIcon /> : <VisibilityOffIcon />
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
                <TextField
                        fullWidth
                        size="small"
                        label="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        fullWidth
                        required
                        size="small"
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        fullWidth
                        required
                        size="small"
                        label="Password"
                        type={visibility ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{ mb: 2 }}
                        slotProps={{
                            input: {
                                endAdornment : (
                                    <InputAdornment position="end">
                                        <IconButton 
                                            onClick={() => setVisibility((prev) => !prev)}
                                            edge="end"
                                        >
                                            {visibility ? (<VisibilityIcon/>) : (<VisibilityOffIcon />) }
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }
                        }}
                    />
                <Button 
                    type="submit" 
                    variant="contained" 
                    loading={loading} 
                    disabled={loading} 
                    fullWidth
                    sx={{backgroundColor:'#26a69a'}}
                    >
                    Sign Up
                </Button>
            </Card>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    )
}