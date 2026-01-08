import { useState } from 'react'
import { Menu, X, Heart, Users, Search, Handbag } from 'lucide-react'
import './Header.css'
import logo2 from '/logo2.png' 
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)


  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <Link to="/home">
            <img src={logo2} alt="Logo" className="logo-img" />
          </Link>
          <span className="logo-mobile-pibare">Hanouer</span>

          {/* Desktop Navigation */}
          <nav className="header-nav-desktop">
            <Link to="/home" className='nav-link'>Home</Link>
            <Link to="/produtos" className='nav-link'>Produtos</Link>
            <Link to="/servicos" className='nav-link'>Serviços</Link>           
            <Link to="/perfil" className='nav-link'><Users /></Link>
            <Link to="/carrinho" className='nav-link'><Handbag /></Link>
          </nav>

          {/* Mobile menu button */}
          <div className="header-mobile-toggle">
            <button onClick={toggleMenu} className="mobile-toggle-btn">
              {isMenuOpen ? <X className="toggle-icon" /> : <Menu className="toggle-icon" />}
            </button>
          </div>
        </div>
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="header-nav-mobile">
            <Link to="/home" className='mobile-nav-link' onClick={toggleMenu}>Home</Link>
            <Link to="/produtos" className='mobile-nav-link' onClick={toggleMenu}>Produtos</Link>
            <Link to="/servicos" className='mobile-nav-link' onClick={toggleMenu}>Serviços</Link>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header 