import { Typography, Box, Checkbox, FormGroup, FormControlLabel, Slider, Stack, Rating } from '@mui/material'
import React, { useContext, useState } from 'react'
import { ProductContext } from '../context/ProductContext'

export default function Sidebar() {
    // const [selectedRating, setSelectedRating] = useState(0)
    // const { selectedRating } = useContext(ProductContext)
    const {
        categories,
        selectedCategories,
        filterCategory,
        selectedPriceRange,
        setSelectedPriceRange,
        // filterRating,
        selectedRating,
        setSelectedRating,
    } = useContext(ProductContext)

    const handlePrice = (_, newPrice) => {
        // setPrice(newPrice)
        setSelectedPriceRange(newPrice)
    }

    const handleRating = (_, newRating) => {
        setSelectedRating(newRating ?? 0)
    }

    function priceText(price) {
        return `${price}$`
    } 

    return(
        <Box sx={{ width: '200px', p: 1, gap: 2 , display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
            {/* <Typography variant="h5" fontWeight='bold'>Filters</Typography> */}
            <Typography variant="subtitle1" sx={{ fontWeight:'bold' }}>Category</Typography>
            <FormGroup>
                {categories?.map((category) => (
                    <FormControlLabel 
                        control={<Checkbox checked={selectedCategories.includes(category)} />} 
                        label={<Typography noWrap>{category}</Typography>} 
                        key={category}
                        onChange={() => filterCategory(category)} />
                ))}
            </FormGroup>
            <Typography variant="subtitle1" sx={{ fontWeight:'bold' }}>Price</Typography>
            <Stack spacing={2} direction='row' sx={{ width:'150px', fontWeight:'bold' }}>
                <Typography>{selectedPriceRange[0]}$</Typography>
                <Typography>-</Typography>
                <Typography>{selectedPriceRange[1]}$</Typography>
            </Stack>
            <Slider sx={{ width:'150px' }}
                getAriaLabel={() => 'Price Range'}
                getAriaValueText={priceText}
                valueLabelDisplay="auto"
                value={selectedPriceRange}
                step={5}
                min={0}
                max={1000}
                onChange={handlePrice}
                />
            
            <Typography variant="subtitle1" sx={{fontWeight:'bold'}}>Ratings</Typography>
            <Rating
                name="simple-controlled"
                value={selectedRating}
                onChange={handleRating}
            />
            
        </Box>
    )
}
//validation in MYF code, virtualization, js vs jsx, why do we change this extension