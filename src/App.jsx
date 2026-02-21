import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Carousel from './components/carousel'
import Busca from './components/Busca';
import Products from './components/Products'
import SingIn from './components/Sign-in';
import SingUp from './components/Sign-up';
import Perfil from './components/Perfil';
import Carrinho from './components/carrinho';

import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        
        <div className="main-content"> 
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <About />
                <Contact />
              </>
            } />
            <Route path="/login" element={<SingIn />} />
            <Route path="/signup" element={<SingUp />} />
            <Route path="/home" element={
              <>
                <Hero />
                <About />
                <Contact />
              </>
            } />
            <Route path="/about" element={<About />} />
            <Route path="/busca" element={<Busca />} />
            <Route path="/produtos" element={<Products />} />
            <Route path="/servicos" element={<Services />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/carrinho" element={<Carrinho />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App