import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Footer from './components/Footer'
import Carousel from './components/carousel'
import Products from './components/Products'
import SignIn from './components/Sign-in';
import SignUp from './components/Sign-up';
import Perfil from './components/Perfil';
import Carrinho from './components/carrinho';
import AdminDashboard from './components/AdminDashboard';
import Comentarios from './components/Testimonials';

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
               <Comentarios />
              </>
            } />
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={
              <>
                <Hero />
                <About />
                <Comentarios />
              </>
            } />
            <Route path="/about" element={<About />} />
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