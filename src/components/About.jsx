import { Heart, Users, BookOpen, HandHeart } from "lucide-react";
import welcomingInterior from "../assets/Foto26.jpeg";
import "./About.css";
import Products from "./Products";
import Services from "./Services";

const About = () => {
   return (
    <section id="sobre" className="about-section">
      <div className="about-container-products">
        <div className="about-grid">
          <div className="about-text">
            <h2 className="about-title">Nossos Produtos</h2>        
          </div>
        </div>
          <Products />
      </div>
      <div className="about-container-services">
        <div className="about-grid">
          <div className="about-text">
            <h2 className="about-title">Nossos Serviços</h2>        
          </div>
        </div>
          <Services />
      </div>
    </section>
  );
};

export default About;
