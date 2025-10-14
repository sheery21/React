import './App.css'
import Navbar from './Componentes/Navbar/navbar'
import Footer from './Componentes/Footer/footer'
import Home from './pages/Home/home'
import About from './pages/About/about'
import { Connect } from 'vite'


function App() {

  return (
    <>
    < Navbar />
    <Home />
    <About />
    <Connect />
    < Footer />
    </>
  )
}

export default App
