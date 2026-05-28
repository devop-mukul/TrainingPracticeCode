import './App.css'

import { BrowserRouter, Routes, Route, Router } from 'react-router-dom'

import Login from './pages/Login'
import LoggedHome from './pages/LoggedHome'


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/loggedHome' element={<LoggedHome />} />
      </Routes>
    </>
  )
}

export default App
