import React from 'react'
import {Typography, FormControl, InputLabel, Select, MenuItem, FormHelperText} from '@mui/material'

export default function SelectMUI() {

    return (
        <>
            <Typography variant='h5'>Select MUI</Typography>
                <FormControl variant='outlined' sx={{minWidth:'150px'}}>
                    <InputLabel>Age</InputLabel>
                    <Select 
                        id='age_label'
                        label="Age"
                        autoWidth
                        
                        // value={age}
                        // onChange={handleChange}
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={30}>30</MenuItem>
                    </Select>
                    <FormHelperText>Select age</FormHelperText>
                </FormControl>
        </>
    )
}