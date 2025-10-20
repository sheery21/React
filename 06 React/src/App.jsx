import { Route, Router, Routes } from 'react-router-dom'
import './App.css'
import Login from './Pages/LogIn'
import SinUp from './Pages/SignUp'
import Home from './Pages/Home'
import About from './Pages/About'
import Services from './Pages/Servicess'
import ContactUs from './Pages/ContactUs'
import DashBoard from './Pages/DashBoard'
import PrivateRoute from './Routes/PrivateRoute'
import AuthRoute from './Routes/AuthRoute'

function App() {

  return (
    <>
        <Routes >
          <Route element={ <AuthRoute /> }>
          <Route path='/' element={< Login/>}/>
          <Route path='/signUp' element={< SinUp/>}/>
          </Route>
          <Route element={ <PrivateRoute /> }>
          <Route path='/home' element={< Home/>}/>
            <Route path='/DashBoard' element={< DashBoard/>}/>
            </Route>
          <Route path='/About' element={< About/>}/>
          <Route path='/Services' element={< Services/>}/>
          <Route path='/Contact' element={< ContactUs/>}/>
        </Routes> 
    </>
  )
}

export default App
