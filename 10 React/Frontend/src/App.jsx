import { Route, Router, Routes } from 'react-router-dom'
import './App.css'
import LogIn from './pages/logIn'
import SignUp from './pages/signUp'
import Dashboard from './pages/dashboard'

function App() {
  

  return (
    <>
   <Routes>
     
    <Route path='/' element={ <LogIn/> } /> 
    <Route  path='/signUp' element={ <SignUp/> } /> 
    <Route  path='/dashboard' element={ <Dashboard/> } /> 
   </Routes>
     
    </>
  )
}

export default App
