import { ArrowRight, Play } from 'lucide-react'
import './Hero.css'
import Carrossel from './carousel'

const Hero = () => {
  return (
    <section id="inicio" className="hero">
      {/* Background Image */}
      <Carrossel className="hero-background"/>
    </section>
  )
}

export default Hero

