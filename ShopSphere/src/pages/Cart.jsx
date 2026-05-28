import Navbar from '../components/Navbar'

import {
    Stack,
    Card,
    CardContent,
    CardMedia,
    CardActions,
    Typography,
    Divider,
    Button,
    IconButton,
    Box,
} from '@mui/material'
import { Rating } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import DeleteIcon from '@mui/icons-material/Delete'

import { Link } from 'react-router-dom'

import { useContext } from 'react'
import { CartContext } from '../context/CartContext'

export default function Cart() {
    const cardWidth = 800
    const {
        cartItem,
        handleIncrease,
        handleDecrease,
        removeFromCart,
        clearCart,
        subtotalInr,
        totalItems,
    } = useContext(CartContext)

    return (
        <>
            <Navbar />
            <Stack direction='row' spacing={2}>
                <Card
                    sx={{
                        display:'flex',
                        flexDirection:'column',
                        width: cardWidth,
                        // height:'800px'
                    }}
                >
                    <Typography variant="h4" sx={{p:2}}>Shopping Cart</Typography>
                    <Divider/>

                    {cartItem.length === 0 ? (
                        <CardContent sx={{ p: 5 }}>
                            <Typography variant='h6' sx={{ mb: 2 }}>
                                Your cart is empty.
                            </Typography>
                            <Button component={Link} to='/' variant='contained'>
                                Continue Shopping
                            </Button>
                        </CardContent>
                    ) : (
                        <>
                            {cartItem.map((item) => (
                                <Card
                                    key={item.id}
                                    sx={{
                                        p: 3,
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start',
                                        gap: 2,
                                        borderRadius: 0,
                                        boxShadow: 'none',
                                        borderBottom: '1px solid',
                                        borderColor: 'divider',
                                    }}
                                >
                                    <Stack direction='row' spacing={2} sx={{ flex: 1 }}>
                                        <CardMedia
                                            sx={{
                                                objectFit: 'contain',
                                                width: 140,
                                                height: 140,
                                            }}
                                            component='img'
                                            image={item.image}
                                            alt={item.title}
                                        />

                                        <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
                                            <Typography variant='h6'>{item.title}</Typography>
                                            <Rating
                                                name={`rating-${item.id}`}
                                                value={item.rating.rate}
                                                readOnly
                                                size='small'
                                            />
                                            <Typography variant='body2' color='text.secondary' sx={{ mt: 1 }}>
                                                {item.description.slice(0, 120)}...
                                            </Typography>

                                            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <IconButton
                                                    size='small'
                                                    color='primary'
                                                    onClick={() => handleDecrease(item.id)}
                                                >
                                                    <RemoveIcon fontSize='small' />
                                                </IconButton>

                                                <Typography sx={{ minWidth: 24, textAlign: 'center', fontWeight:'bold' }}>
                                                    {item.quantity}
                                                </Typography>

                                                <IconButton
                                                    size='small'
                                                    color='primary'
                                                    onClick={() => handleIncrease(item.id)}
                                                >
                                                    <AddIcon fontSize='small' />
                                                </IconButton>

                                                <Button
                                                    startIcon={<DeleteIcon />}
                                                    color='error'
                                                    variant="outlined"
                                                    onClick={() => removeFromCart(item.id)}
                                                >
                                                    Remove
                                                </Button>
                                            </Box>
                                        </CardContent>
                                    </Stack>

                                    <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
                                        <Typography variant='h6'>₹{Math.round(item.price * 90 * item.quantity)}</Typography>
                                        <Typography variant='body2' color='text.secondary'>
                                            ₹{Math.round(item.price * 90)} each
                                        </Typography>
                                    </CardContent>
                                </Card>
                            ))}
                        </>
                    )}
                </Card>

                <Card
                    sx={{
                        width:cardWidth-300,
                        maxHeight:"50vh",
                        p:2
                    }}
                >
                    <CardContent>
                        <Typography variant='body1' color='text.secondary'>Items: {totalItems}</Typography>
                        <Typography variant="h5" sx={{ mt: 1 }}>
                            Subtotal: <b>₹{Math.round(subtotalInr)}</b>
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ display: 'flex', gap: 1 }}>
                        <Button
                            variant='outlined'
                            color='error'
                            onClick={clearCart}
                            disabled={cartItem.length === 0}
                        >
                            Clear Cart
                        </Button>
                        <Button 
                            component={Link}
                            to='/payment'
                            variant="contained"
                            disabled={cartItem.length === 0}
                        >Proceed to Buy</Button>
                    </CardActions>
                </Card>
            </Stack>
        </>
    )
}