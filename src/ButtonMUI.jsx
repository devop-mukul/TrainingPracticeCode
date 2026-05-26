import React, { useState, useEffect } from 'react';
import { Typography, Stack, Button, Divider } from '@mui/material';


export default function ButtonMUI() {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (loading) {
            const timeout = setTimeout(() => {
                setLoading(false);
            }, 2000);
            return () => clearTimeout(timeout);
        }
    }, [loading]);

    return (
        <>
        <Typography variant="h2" sx={{ fontWeight: 'bold' , color: 'darkorange'}}>
            Button MUI
        </Typography>
        <Stack
            spacing={3}
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
        >
            <Button variant="text" sx={{color:'green'}}>Text</Button>
            <Button
                sx={{color:'black', backgroundColor: 'white'}}
                variant="contained"
                onClick={() => setLoading(true)}
                // disabled={loading}
                loading={loading}
                loadingPosition='start'
                // loadingIndicator='loading..'
            >
            {/* {loading ? 'Loading...' : 'contained'} */}
            Contained
            </Button>
            <Button variant="outlined"
                loading={loading}    
                loadingPosition='end'
                onClick={() => setLoading(true)}
            >outlined</Button>
        </Stack>
        </>
    );
}