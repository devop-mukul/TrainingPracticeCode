import React from 'react'
import {Typography, Box} from '@mui/material'

export default function Sidebar() {
    return(
        <Box sx={{width:'250px', p:1, gap:2 , display:'flex', flexDirection:'column', textAlign:'left' }}>
            <Typography variant="h5" fontWeight='bold'>Filters</Typography>
            <Typography variant="body1">Category</Typography>
            <Typography variant="body1">Price</Typography>
            <Typography variant="body1">Ratings</Typography>
        </Box>
    )
}