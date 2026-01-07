import { useState } from 'react'
import { Menu, X, Heart, Users, Search, Handbag } from 'lucide-react'
import './Header.css'
import logo2 from '/logo2.png' 
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [busca, setBusca] = useState('');
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false) // Novo estado para a busca

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen) // Função para abrir/fechar busca

  const realizarBusca = (e) => {
    if (e.key === 'Enter') {
      navigate(`/busca?q=${busca}`); // Envia para a página de busca
      setIsSearchOpen(false);
    }
  };

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
            
            {/* Ícone de busca agora é um botão que dispara o toggleSearch */}
            <button onClick={toggleSearch} className='nav-icon-btn'>
              <Search className="nav-link" />
            </button>
            
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

        {/* BARRA DE BUSCA QUE DESCE */}
        <div className={`search-bar-container ${isSearchOpen ? 'open' : ''}`}>
          <div className="search-bar-content">
            <input 
              type="text" 
              placeholder="O que você está procurando?" 
              className="search-input"
              autoFocus={isSearchOpen} 
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              onKeyDown={realizarBusca}
            />
            <button onClick={toggleSearch} className="close-search">
              <X size={20} />
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