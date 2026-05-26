import React, {useState} from 'react'
import {Typography, Button} from '@mui/material'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'

export default function DialogMUI() {
    const [open, setOpen] = useState(false)
    return (
        <>
            <Typography variant="h4">Dialog MUI</Typography>
            <Button variant="contained" onClick={() => setOpen(true)}>Open Dialog</Button>
            <Dialog
                // fullScreen={true}
                // fullWidth
                // maxWidth
                scroll='paper'
                open={open}
                onClose={() => setOpen(false)}
            >
                <DialogTitle>Confirmation Dialog!</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure?enjfenfe
                        fnjekfnejfnjenfejnfjenf
                        efnjenfjenfjenf
                        efnjenfjenfjenfenfjenfjenfje
                        fenjfnejfnenfe
                        fenjfnejfnenfefenjfnejfe
                        fenjfnejfnenfeenfj
                        nfjenf
                        efnjenfjenfjenf
                        efnjenfjenfjenfenfjenfjenfje
                        fenjfnejfnenfe
                        fenjfnejfnenfefenjfnejfe
                        fenjfnejfnenfeenfj
                        nfjenf
                        efnjenfjenfjenf
                        efnjenfjenfjenfenfjenfjenfje
                        fenjfnejfnenfe
                        fenjfnejfnenfefenjfnejfe
                        fenjfnejfnenfeenfj
                        nfjenf
                        efnjenfjenfjenf
                        efnjenfjenfjenfenfjenfjenfje
                        fenjfnejfnenfe
                        fenjfnejfnenfefenjfnejfe
                        fenjfnejfnenfeenfj
                        nfjenf
                        efnjenfjenfjenf
                        efnjenfjenfjenfenfjenfjenfje
                        fenjfnejfnenfe
                        fenjfnejfnenfefenjfnejfe
                        fenjfnejfnenfeenfj
                        nfjenf
                        efnjenfjenfjenf
                        efnjenfjenfjenfenfjenfjenfje
                        fenjfnejfnenfe
                        fenjfnejfnenfefenjfnejfe
                        fenjfnejfnenfeenfj
                        nfjenf
                        efnjenfjenfjenf
                        efnjenfjenfjenfenfjenfjenfje
                        fenjfnejfnenfe
                        fenjfnejfnenfefenjfnejfe
                        fenjfnejfnenfeenfj
                        nfjenf
                        efnjenfjenfjenf
                        efnjenfjenfjenfenfjenfjenfje
                        fenjfnejfnenfe
                        fenjfnejfnenfefenjfnejfe
                        fenjfnejfnenfeenfj
                        nfjenf
                        efnjenfjenfjenf
                        efnjenfjenfjenfenfjenfjenfje
                        fenjfnejfnenfe
                        fenjfnejfnenfefenjfnejfe
                        fenjfnejfnenfeenfj
                        nfjenf
                        efnjenfjenfjenf
                        efnjenfjenfjenfenfjenfjenfje
                        fenjfnejfnenfe
                        fenjfnejfnenfefenjfnejfe
                        fenjfnejfnenfeenfj
                        nfjenf
                        efnjenfjenfjenf
                        efnjenfjenfjenfenfjenfjenfje
                        fenjfnejfnenfe
                        fenjfnejfnenfefenjfnejfe
                        fenjfnejfnenfeenfj
                        nfjenf
                        efnjenfjenfjenf
                        efnjenfjenfjenfenfjenfjenfje
                        fenjfnejfnenfe
                        fenjfnejfnenfefenjfnejfe
                        fenjfnejfnenfeenfj
                        nfjenf
                        efnjenfjenfjenf
                        efnjenfjenfjenfenfjenfjenfje
                        fenjfnejfnenfe
                        fenjfnejfnenfefenjfnejfe
                        fenjfnejfnenfeenfj
                        nfjenf
                        efnjenfjenfjenf
                        efnjenfjenfjenfenfjenfjenfje
                        fenjfnejfnenfe
                        fenjfnejfnenfefenjfnejfe
                        fenjfnejfnenfeenfj
                        nfjenf
                        efnjenfjenfjenf
                        efnjenfjenfjenfenfjenfjenfje
                        fenjfnejfnenfe
                        fenjfnejfnenfefenjfnejfe
                        fenjfnejfnenfeenfj
                        nfjenf
                        efnjenfjenfjenf
                        efnjenfjenfjenfenfjenfjenfje
                        fenjfnejfnenfe
                        fenjfnejfnenfefenjfnejfe
                        fenjfnejfnenfeenfj
                        nfjenf
                        efnjenfjenfjenf
                        efnjenfjenfjenfenfjenfjenfje
                        fenjfnejfnenfe
                        fenjfnejfnenfefenjfnejfe
                        fenjfnejfnenfeenfj
                        nfjenf
                        efnjenfjenfjenf
                        efnjenfjenfjenfenfjenfjenfje
                        fenjfnejfnenfe
                        fenjfnejfnenfefenjfnejfe
                        fenjfnejfnenfeenfj
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button autoFocus onClick={() => setOpen(false)}>Submit</Button>
                </DialogActions>
            </Dialog>    
        </>
    )
}