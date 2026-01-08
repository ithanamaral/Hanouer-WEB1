import {
  Heart,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";
import "./Footer.css";

const Footer = () => {
  const quickLinks = [
    { name: "Início", href: "#inicio" },
    { name: "Sobre Nós", href: "#sobre" },
    { name: "Cultos", href: "#cultos" },
    { name: "Ministérios", href: "#ministerios" },
    { name: "Contato", href: "#contato" },
  ];

  const ministries = [
    { name: "Ministério de Jovens", href: "#ministerios" },
    { name: "Ministério Pastoral", href: "#ministerios" },
    { name: "Ministério de Louvor", href: "#ministerios" },
    { name: "Ministério Social", href: "#ministerios" },
    { name: "Escola Bíblica", href: "#ministerios" },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
         <img src="./logo2.png" alt="logo do Hanouer" className="footer-logo" />
        </div>

        {/* Bottom Section */}
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
