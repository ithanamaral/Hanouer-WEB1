import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, CreditCard, Edit2, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Perfil.css';

function Perfil() {
  const navigate = useNavigate();
  const [editando, setEditando] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dados, setDados] = useState({ nome: '', email: '', senha: '', cpf: '' });

  const cpfLogado = localStorage.getItem('user_cpf');

  useEffect(() => {
    if (!cpfLogado) {
      navigate('/signin');
      return;
    }

    fetch(`http://localhost:8000/perfil/${cpfLogado}`)
      .then(res => res.json())
      .then(data => {
        setDados({
          nome: data.name || '',
          email: data.email || '',
          senha: data.password || '',
          cpf: data.cpf || ''
        });
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro ao carregar dados:", err);
        setLoading(false);
      });
  }, [cpfLogado, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/perfil/update/${cpfLogado}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: dados.nome,
          email: dados.email,
          password: dados.senha
        })
      });
      if (response.ok) {
        alert("Perfil atualizado com sucesso!");
        setEditando(false);
      }
    } catch (error) {
      alert("Erro ao atualizar.");
    }
  };

  if (loading) return <div className="auth-page">Carregando...</div>;

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="perfil-header-container">
          <h2>Meu Perfil</h2>
          <Edit2 
            className={`edit-icon-btn ${editando ? 'active' : ''}`} 
            onClick={() => setEditando(!editando)} 
            size={20} 
          />
        </div>
        
        <form onSubmit={handleUpdate} className="auth-form">
          <div className="input-group">
            <label>Nome</label>
            <div className="input-wrapper">
              <User className="input-icon" size={20} />
              <input 
                type="text" 
                value={dados.nome} 
                disabled={!editando}
                onChange={(e) => setDados({...dados, nome: e.target.value})}
              />
            </div>
          </div>

          <div className="input-group">
            <label>E-mail</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={20} />
              <input 
                type="email" 
                value={dados.email} 
                disabled={!editando}
                onChange={(e) => setDados({...dados, email: e.target.value})}
              />
            </div>
          </div>

          <div className="input-group">
            <label>Senha</label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={20} />
              <input 
                type={editando ? "text" : "password"} 
                value={dados.senha} 
                disabled={!editando}
                onChange={(e) => setDados({...dados, senha: e.target.value})}
              />
            </div>
          </div>

          <div className="input-group">
            <label>CPF (Não editável)</label>
            <div className="input-wrapper">
              <CreditCard className="input-icon" size={20} />
              <input type="text" value={dados.cpf} disabled />
            </div>
          </div>

          {editando && (
            <button type="submit" className="btn-primary">
              <Save size={20} style={{marginRight: '8px'}} />
              Salvar Alterações
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Perfil;