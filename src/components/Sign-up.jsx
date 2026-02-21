import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Adicionado para redirecionar
import { Send, User, Mail, Lock, CreditCard } from 'lucide-react';
import './Sign-up.css';

function SignUp() {
  const formRef = useRef();
  const navigate = useNavigate();
  const [isSending, setIsSending] = useState(false);
  const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setMensagem({ tipo: '', texto: '' });

    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());
    
    try {
      // Conexão com Back-end
      const response = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.user_name,
          email: data.user_email,
          password: data.user_password,
          cpf: data.user_cpf
        })
      });

      const result = await response.json();

      if (response.ok) {
        setMensagem({ tipo: 'sucesso', texto: "Conta criada com sucesso! Redirecionando..." });
        formRef.current.reset();
        setTimeout(() => navigate('/login'), 2000); 
      } else {
        const erroMsg = typeof result.detail === 'string' ? result.detail : "Erro ao cadastrar.";
        setMensagem({ tipo: 'erro', texto: erroMsg });
      }
    } catch (error) {
      setMensagem({ tipo: 'erro', texto: "Não foi possível conectar ao servidor." });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="signup" className="signup-section">
      <div className="signup-container">
        <div className="signup-form-wrapper">
          <h3 className="signup-form-title">Crie sua Conta</h3>
          <p className="signup-subtitle">Entre para a família Hanouer Petshop</p>
          {mensagem.texto && (
            <p style={{ 
              color: mensagem.tipo === 'erro' ? '#ff4d4d' : '#2ecc71', 
              textAlign: 'center',
              fontSize: '0.9rem',
              marginBottom: '1rem'
            }}>
              {mensagem.texto}
            </p>
          )}

          <form className="signup-form" ref={formRef} onSubmit={handleSignUp}>
            
            <div className="form-group">
              <label htmlFor="name" className="form-label">Nome Completo</label>
              <div className="input-with-icon">
                <User size={18} className="input-icon" />
                <input
                  type="text"
                  id="name"
                  name="user_name"
                  className="form-input"
                  placeholder="Seu nome completo"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">E-mail</label>
              <div className="input-with-icon">
                <Mail size={18} className="input-icon" />
                <input
                  type="email"
                  id="email"
                  name="user_email"
                  className="form-input"
                  placeholder="email"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password" className="form-label">Senha</label>
                <div className="input-with-icon">
                  <Lock size={18} className="input-icon" />
                  <input
                    type="password"
                    id="password"
                    name="user_password"
                    className="form-input"
                    placeholder="senha"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="cpf" className="form-label">CPF</label>
                <div className="input-with-icon">
                  <CreditCard size={18} className="input-icon" />
                  <input
                    type="text"
                    id="cpf"
                    name="user_cpf"
                    className="form-input"
                    placeholder="000.000.000-00"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="btn-signup"
            >
              <Send size={18} />
              {isSending ? "Cadastrando..." : "Criar Minha Conta"}
            </button>
          </form>
          
          <p className="login-link">
            Já tem uma conta? <Link to="/login">Faça Sign In</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default SignUp;