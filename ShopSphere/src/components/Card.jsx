import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

export default function ProductCard({ productId, image, title, description, price, rating }) {
    const { cartItem, handleIncrease, handleDecrease } = useContext(CartContext)
    const navigate = useNavigate();

    const existingCartItem = cartItem.find((item) => item.id === productId)

    // Prevent card click when clicking cart controls
    const handleCardClick = (e) => {
        // If the click is on a button or icon button, do not navigate
        if (
            e.target.closest('button') ||
            e.target.closest('svg')
        ) {
            return;
        }
        navigate(`/product/${productId}`)
    }

    return (
        <Card
            sx={{
                maxWidth: 300,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                bgcolor: 'background.paper',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease-in',
                boxShadow: 1,
                cursor: 'pointer',
                '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 5,
                    backgroundColor: 'action.hover',
                },
            }}
            onClick={handleCardClick}
        >
            <CardMedia
                sx={{ objectFit: 'contain' }}
                component="img"
                height="200"
                image={image}
                alt={title}
            />
            <CardContent>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', minHeight: 'auto' }}>
                    {title}
                </Typography>
                <Typography variant='subtitle' sx={{ display: 'flex', fontWeight: 'bold', py: 0.5 }}>
                    ₹{price * 90}
                </Typography>
                <Rating
                    sx={{ display: 'flex', justifyContent: 'left', py: 0.2 }}
                    name="read-only"
                    value={rating.rate}
                    readOnly
                />
                <Typography gutterBottom variant="body2" sx={{ color: 'text.secondary', minHeight: 4, py: 1 }}>
                    {description.slice(0, 80)}...
                </Typography>
            </CardContent>
            <CardActions sx={{ mt: 'auto', pl: 2, pb: 2 }}>
                {!existingCartItem ? (
                    <Button
                        variant="contained"
                        size="small"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleIncrease(productId);
                        }}
                    >BUY</Button>
                ) : (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            bgcolor: 'primary.light',
                            color: 'white',
                            borderRadius: 1,
                        }}
                    >
                        <IconButton size="small" onClick={(e) => { e.stopPropagation(); handleDecrease(productId); }}>
                            <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography>{existingCartItem.quantity}</Typography>
                        <IconButton size="small" onClick={(e) => { e.stopPropagation(); handleIncrease(productId); }}>
                            <AddIcon fontSize="small" />
                        </IconButton>
                    </Box>
                )}
            </CardActions>
        </Card>
    );
}