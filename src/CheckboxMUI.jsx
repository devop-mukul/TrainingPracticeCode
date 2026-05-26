import React from 'react'
import {Typography, Checkbox } from '@mui/material'
import {FormControlLabel, FormGroup, FormControl, FormLabel} from '@mui/material'
import {Radio, RadioGroup} from '@mui/material'
import { Switch } from '@mui/material'
import {Autocomplete, TextField} from '@mui/material'

export default function CheckboxMUI() {
    return (
        <>
            <Typography variant='h5' sx={{pb:3}}>Checkbox & Radio & Switch MUI</Typography>
            <FormGroup sx={{p:3}}>
                <FormLabel>Checkbox</FormLabel>
                {/* <Checkbox defaultChecked />
                <Checkbox />
                <Checkbox disabled/>
                <Checkbox disabled checked/> */}
                <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                <FormControlLabel required control={<Checkbox />} label="Required" />
                <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
            </FormGroup>

            <FormControl sx={{ p:3 }}>
                <FormLabel>Gender</FormLabel>
                <RadioGroup row>
                    <FormControlLabel label='Female' control={< Radio/>} value='Female'/>
                    <FormControlLabel label='Male' control={< Radio/>} value='Male'/>
                    <FormControlLabel label='Others' control={< Radio/>} value='Others'/>
                </RadioGroup>
            </FormControl>

            <FormGroup sx={{pt:3, p:3}}>
                <FormLabel>Switch</FormLabel>
                <FormControlLabel control={<Switch defaultChecked/>} label="Label" />
                <FormControlLabel  required control={<Switch />} label="Required" />
                <FormControlLabel disabled control={<Switch />} label="Disabled" />
                <Switch disabled checked/> 
            </FormGroup>

            <Autocomplete 
                disableClearable
                // freeSolo
                multiple
                sx={{width:'300px'}}
                options={["Apple", "Banana"]}
                renderInput={(params) => {
                    // console.log(params)
                    return <TextField {...params} label="Fruits" />}
                }
            />
        </>
    )
}