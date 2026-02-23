import React, { useState, useEffect } from 'react';
import './Testimonials.css';
import { MessageSquare, User, Send } from 'lucide-react';

const Testimonials = () => {
  const [comentarios, setComentarios] = useState([]);
  const [novoComentario, setNovoComentario] = useState({ nome: '', mensagem: '' });
  const [enviando, setEnviando] = useState(false);

  const carregarComentarios = async () => {
    try {
      const res = await fetch('http://localhost:8000/comentarios');
      const data = await res.json();
      setComentarios(data);
    } catch (error) {
      console.error("Erro ao carregar comentários:", error);
    }
  };

  useEffect(() => {
    carregarComentarios();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!novoComentario.nome || !novoComentario.mensagem) return;

    setEnviando(true);
    try {
      const response = await fetch('http://localhost:8000/comentarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoComentario)
      });

      if (response.ok) {
        setNovoComentario({ nome: '', mensagem: '' });
        carregarComentarios(); // Recarrega a lista
        alert("Obrigado pelo seu comentário!");
      }
    } catch (error) {
      console.error("Erro ao enviar:", error);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <h2 className="testimonials-title">O que dizem nossos clientes</h2>
        
        {/* Lista de Comentários */}
        <div className="testimonials-grid">
          {comentarios.length > 0 ? (
            comentarios.map((c) => (
              <div key={c.id} className="testimonial-card">
                <div className="testimonial-header">
                  <div className="testimonial-avatar">
                    <User size={20} />
                  </div>
                  <div>
                    <strong>{c.nome}</strong>
                    <span className="testimonial-date">{c.data}</span>
                  </div>
                </div>
                <p className="testimonial-text">"{c.mensagem}"</p>
              </div>
            ))
          ) : (
            <p className="no-comments">Seja o primeiro a comentar!</p>
          )}
        </div>

        <div className="testimonial-form-wrapper">
          <h3>Deixe seu depoimento</h3>
          <form onSubmit={handleSubmit} className="testimonial-form">
            <input 
              type="text" 
              placeholder="Seu nome" 
              value={novoComentario.nome}
              onChange={(e) => setNovoComentario({...novoComentario, nome: e.target.value})}
              required
            />
            <textarea 
              placeholder="Escreva sua experiência com a Hanouer..." 
              value={novoComentario.mensagem}
              onChange={(e) => setNovoComentario({...novoComentario, mensagem: e.target.value})}
              required
            />
            <button type="submit" disabled={enviando}>
              <Send size={16} /> {enviando ? 'Enviando...' : 'Enviar Comentário'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;