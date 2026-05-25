import { Typography, Box, Checkbox, FormGroup, FormControlLabel, Slider } from '@mui/material'
import React, { useState } from 'react'

export default function Sidebar({ categories = [], selectedCategories = [], onCategoryClick, setSelectedPriceRange, selectedPriceRange }) {
    // const [price, setPrice] = useState([0, 50])

    const handlePrice = (_, newPrice) => {
        // setPrice(newPrice)
        setSelectedPriceRange(newPrice)
    }

    function priceText(price) {
        return `${price}$`
    } 

    return(
        <Box sx={{ width: '250px', p: 1, gap: 2 , display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
            {/* <Typography variant="h5" fontWeight='bold'>Filters</Typography> */}
            <Typography variant="subtitle1" sx={{fontWeight:'bold'}}>Category</Typography>
            <FormGroup>
                {categories?.map((category) => (
                    <FormControlLabel 
                        control={<Checkbox checked={selectedCategories.includes(category)} />} 
                        label={<Typography noWrap>{category}</Typography>} 
                        key={category}
                        onChange={() => onCategoryClick?.(category)} />
                ))}
            </FormGroup>
            <Typography variant="subtitle1" sx={{ fontWeight:'bold' }}>Price</Typography>
            <Slider 
                // getAriaLabel={() => 'Price Range'}
                getAriaValueText={priceText}
                valueLabelDisplay="auto"
                value={selectedPriceRange}
                step={5}
                min={10}
                max={100}
                onChange={handlePrice}
                />
            <Typography variant="subtitle1" sx={{fontWeight:'bold'}}>Ratings</Typography>
        </Box>
    )
}