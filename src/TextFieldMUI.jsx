import React from 'react'
import {Typography, TextField, Stack, MenuItem} from '@mui/material'

export default function TextFieldMUI() {
    const currencies = [
        {
            value: 'USD',
            label: '$',
        },
        {
            value: 'EUR',
            label: '€',
        },
        {
            value: 'BTC',
            label: '฿',
        },
        {
            value: 'JPY',
            label: '¥',
        },
        ];


    return (
        <>
        <Typography>TextField</Typography>
            <Stack direction='row' spacing={2}>
                <TextField label='Outlined' variant='outlined' required />
                <TextField 
                    label='Filled' 
                    variant='filled' 
                    required
                    error
                /> 
                <TextField 
                    label='Standard' 
                    variant='standard' 
                    type='email' 
                    autoComplete='on' 
                    defaultValue="hello@gmail.com"
                    helperText='email@gmail.com'
                    />
                
            </Stack>
            <Typography>TextField Multiline</Typography>
            <Stack direction='row' spacing={2}>
                <TextField
                        variant='filled'
                        label='Filled 2'
                        multiline
                        maxRows={3}
                />
                <TextField
                        variant='filled'
                        label='Filled 3'
                        multiline
                        rows={2}
                />
            </Stack>
            <Typography variant='body1' sx={{pb:2, pt:2}}>TextField Select</Typography>
            <Stack direction='row' spacing={2}>
                <TextField
                        variant='outlined'
                        label='Select'
                        select
                        defaultValue='EUR'
                        sx={{ width:'auto' }}
                        helperText='Select currency'
                >
                    {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Stack>
        </>
    );
}