import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import { Box, Typography, Card, CardMedia, CardContent, Button, Rating, Stack, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Navbar from '../components/Navbar';
import { CartContext } from '../context/CartContext';

export default function ProductDetails() {
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  const { cartItem, handleIncrease, handleDecrease } = useContext(CartContext);
  const product = products.find((p) => String(p.id) === String(id));
  const cartProduct = cartItem.find((item) => String(item.id) === String(id));

  if (!product) {
    return (
      <Box sx={{ p: 4 }}>
        <Navbar />
        <Typography variant="h5">Product not found.</Typography>
        <Button component={Link} to="/">Back to Home</Button>
      </Box>
    );
  }

  return (
    <>
      <Navbar />
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', p: 4 }}>
        <Card sx={{ maxWidth: 700, width: '100%', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, p: 2 }}>
          <CardMedia
            component="img"
            image={product.image}
            alt={product.title}
            sx={{ width: 300, height: 300, objectFit: 'contain', m: 2 }}
          />
          <CardContent sx={{ flex: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>{product.title}</Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>{product.category}</Typography>
            <Rating value={product.rating?.rate || 0} readOnly precision={0.1} sx={{ mb: 1 }} />
            <Typography variant="h6" color="primary" sx={{ mb: 2 }}>₹{Math.round(product.price * 90)}</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>{product.description}</Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              {!cartProduct ? (
                <Button variant="contained" onClick={() => handleIncrease(product.id)}>
                  Add to Cart
                </Button>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: 'primary.light', color: 'white', borderRadius: 1, px: 1 }}>
                  <IconButton size="small" onClick={() => handleDecrease(product.id)}>
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  <Typography sx={{ minWidth: 24, textAlign: 'center' }}>{cartProduct.quantity}</Typography>
                  <IconButton size="small" onClick={() => handleIncrease(product.id)}>
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Box>
              )}
              <Button component={Link} to="/cart" variant="outlined">Go to Cart</Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
