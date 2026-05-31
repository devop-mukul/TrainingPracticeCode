import './App.css'

import { Routes, Route } from 'react-router-dom'

import Login from './pages/Login'
import LoggedHome from './pages/LoggedHome'
import CardDriverMapping from './pages/CardDriverMapping'


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/loggedHome' element={<LoggedHome />}>
          <Route path='card-driver-mapping' element={<CardDriverMapping />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
