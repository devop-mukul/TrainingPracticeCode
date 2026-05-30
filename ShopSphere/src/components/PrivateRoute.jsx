import {Navigate, useLocation, Outlet } from 'react-router-dom'
import {useAuth} from '../context/AuthContext'

export default function PrivateRoute() {
    const{user, loading}  = useAuth()
    const location = useLocation()

    if(loading) return <p>Checking Session...</p>

    if(!user)
        return <Navigate to ="/" replace state={{ from: location}}/>
    
    return <Outlet/>
}