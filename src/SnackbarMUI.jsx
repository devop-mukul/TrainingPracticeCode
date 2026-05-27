import React, {useState} from 'react'
import {Typography, Button, Box} from '@mui/material'
import {Snackbar, Alert} from '@mui/material'

export default function SnackbarMUI() {
    const [open, setOpen] = useState(false)
    
    const handleClose = (event, reason) => {
        // console.log("event", event);
        // console.log("reason", reason);
        
        if(reason === 'clickaway')
            return
        setOpen(false)
    }

    const snackbarAction = (
        <Box>
            <Button>Retry</Button>
            <Button>Close</Button>
        </Box>
    )

    return (
        <>
            <Typography variant="h4">Snackbar MUI</Typography>
            <Button variant='contained' onClick={() => setOpen(true)}>Submit</Button>
            <Snackbar 
                message="Form submitted successfully!"
                autoHideDuration={2000}
                open={open}
                onClose={handleClose}
                // action={<Button color="warning" size="small">Undo </Button>}
                // action={<Box>
                //     <Button>Retry</Button>
                //     <Button>Close</Button>
                // </Box>}
                action={snackbarAction}
                anchorOrigin={{horizontal:'right', vertical:'bottom'}}
            />
            <Button variant='text' onClick={() => setOpen(true)}>Alert Snackbar</Button>
            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity="warning"//error, info, success, warning
                    variant="standard"
                    sx={{ width: '100%' }}
                >
                    This is an alert snackbar!
                </Alert>
            </Snackbar>
            
        </>
    )
}