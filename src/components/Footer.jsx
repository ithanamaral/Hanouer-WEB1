
import "./Footer.css";

const Footer = () => {
    return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
         <img src="./logo2.png" alt="logo do Hanouer" className="footer-logo" />
        </div>

  
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="footer-copyright">
              © 2026 Hanouer. Todos os direitos
              reservados.
            </div>
            <div className="footer-legal-links">
              <a href="#" className="footer-legal-link">
                Política de Privacidade
              </a>
              <a href="#" className="footer-legal-link">
                Termos de Uso
              </a>
              <a href="#" className="footer-legal-link">
                Transparência
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
