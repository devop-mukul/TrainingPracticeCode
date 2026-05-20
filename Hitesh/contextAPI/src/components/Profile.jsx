import { useContext } from 'react'
import UserContext from '../context/UserContext.js'

function Profile() {
  const { user } = useContext(UserContext)
  if (!user) return <div>Please login to view profile</div>
  return (
    <div>
      <h2>Welcome {user.username}</h2>
    </div>
  )
}

export default Profile