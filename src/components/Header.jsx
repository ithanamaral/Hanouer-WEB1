import { useState } from 'react'
import { Menu, X, Heart, Users, Search, Handbag, LogOut } from 'lucide-react'
import './Header.css'
import logo2 from '/logo2.png' 
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Força atualização do componente ao mudar de rota
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const isLogged = !!localStorage.getItem('user_cpf');

  const handleLogout = () => {
    localStorage.removeItem('user_cpf');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_email');
    localStorage.removeItem('password');
    navigate('/login');
  };

  const userEmail = localStorage.getItem('user_email');

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <Link to="/home">
            <img src={logo2} alt="Logo" className="logo-img" />
          </Link>
          <span className="logo-mobile-pibare">Hanouer</span>

          {/* Navegação do Computador */}
          <nav className="header-nav-desktop">
            <Link to="/home" className='nav-link'>Home</Link>
            <Link to="/produtos" className='nav-link'>Produtos</Link>
            <Link to="/servicos" className='nav-link'>Serviços</Link>           
            {userEmail == 'admin@admin.com' && (
              <Link to="/dashboard" className='nav-link'>Dashboard</Link>
            )}
            {userEmail !== 'admin@admin.com' && (
              <Link to="/perfil" className='nav-link'><Users /></Link>
            )}
            {isLogged && (
              <button 
                className='nav-link' 
                style={{background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center'}}
                onClick={handleLogout}
                title="Sair"
              >
                <LogOut />
              </button>
            )}
            <button 
              className='nav-link' 
              style={{background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center'}}
              onClick={() => {
                navigate('/carrinho');
              }}
            >
              <Handbag />
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header 