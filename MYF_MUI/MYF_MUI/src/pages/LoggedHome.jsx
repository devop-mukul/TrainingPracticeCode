import {useState} from 'react'

import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

export default function LoggedHome() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    return (
        <>
            <Navbar onMenuClick={() => setIsDrawerOpen((prev) => !prev)} isDrawerOpen={isDrawerOpen} />
            <Sidebar open={isDrawerOpen} setOpen={setIsDrawerOpen} />
            {/* <Grid /> */}
        </>
    )
}