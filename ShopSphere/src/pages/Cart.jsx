import React from 'react'
import Navbar from '../components/Navbar'

import {Stack, Card, CardContent, CardMedia, CardActions, Typography, Divider, Button} from '@mui/material'
import {Rating} from '@mui/material'

import {Link} from 'react-router-dom'

import { useContext } from 'react'
import { CartContext } from '../context/CartContext'

export default function Cart() {
    const data = {
        category: "men's clothing",
        description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
        id: 2,
        image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png",
        price: 22.3,
        rating: {rate: 4.1, count: 259},
        title: "Mens Casual Premium Slim Fit T-Shirts "
    }
    const cardWidth = 800
    const { cartItem, setCartItem } = useContext(CartContext)
    console.log(cartItem);
    
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
                    <Card
                        sx={{
                            p:5,
                            // width:100,
                            display:'flex',
                            flexDirection:'row',
                            justifyContent:'left',
                            alignItems:'top'
                        }}
                    >
                        <CardMedia
                            sx={{ objectFit: 'contain', display:'flex', justifyContent:'left'}}
                            component="img"
                            height='200px'
                            image={data.image}
                            alt={data.title}
                        />
                        <CardContent>
                            <Typography variant="h5">{data.title}</Typography>
                            <Rating 
                                name="read-only"
                                value={data.rating.rate}
                                readOnly
                            />
                            <CardActions>
                                <Button variant="contained">Buy</Button>
                            </CardActions>
                            {/* {console.log(data.rating.rate)} */}
                        </CardContent>
                        <CardContent>
                            <Typography variant="body1"><b>₹{data.price * 90}</b></Typography>
                        </CardContent>
                    </Card>
                </Card>

                <Card
                    sx={{
                        width:cardWidth-300,
                        p:2
                    }}
                >
                    <CardContent>
                        <Typography variant="h5">Subtotal: <b>₹{data.price * 90}</b></Typography>
                    </CardContent>
                    <CardActions>
                        <Button 
                            component={Link}
                            to='/payment'
                            variant="contained"
                        >Proceed to Buy</Button>
                    </CardActions>
                </Card>
            </Stack>
        </>
    )
}