import {useState} from 'react'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

export default function LoggedHome() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    return (
        <>
            <Navbar onMenuClick={() => setIsDrawerOpen((prev) => !prev)} isDrawerOpen={isDrawerOpen} />
            <Sidebar open={isDrawerOpen} setOpen={setIsDrawerOpen} />
            <Box
                sx={{
                    mt: '64px',
                    ml: isDrawerOpen ? '230px' : '50px',
                    transition: '0.2s',
                    minHeight: 'calc(100vh - 64px)'
                }}
            >
                <Outlet />
            </Box>
        </>
    )
}