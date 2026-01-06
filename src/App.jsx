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

// Importa Rota
import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        
        {/* Esta div é a chave para o conteúdo aparecer! */}
        <div className="main-content"> 
          <Routes>
            <Route path="/" element={
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
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App