import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock } from 'lucide-react';
import './Sign-in.css';

function SignIn() {
  const formRef = useRef();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [erro, setErro] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErro('');

    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.user_email, // Pega do input name="user_email"
          password: data.user_password // Mapeia para o 'senha' do Python
        })
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Navegando para Home...");
        localStorage.setItem('user_cpf', result.user_cpf); 
        localStorage.setItem('user_name', result.user_name);
        localStorage.setItem('user_email', result.user_email);
        localStorage.setItem('password', result.token);
        
        const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        if (carrinho.length > 0) {
          navigate('/carrinho');
        } else {
          navigate('/home');
        }
      } else {
        // Evita erro de "Object as child" pegando apenas a string do erro
        let msg = "Falha no login.";
        if (result.detail) {
          msg = typeof result.detail === 'string' ? result.detail : result.detail[0].msg;
        }
        setErro(msg);
      }
    } catch (error) {
      setErro("Servidor fora do ar.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="signin" className="signin-section">
      <div className="signin-container">
        <div className="signin-form-wrapper">
          <h3 className="signin-form-title">Acessar Conta</h3>
          {erro && <p style={{ color: 'red', textAlign: 'center' }}>{erro}</p>}

          <form className="signin-form" ref={formRef} onSubmit={handleSignIn}>
            <div className="form-group">
              <label className="form-label">E-mail</label>
              <div className="input-with-icon">
                <Mail size={18} className="input-icon" />
                <input type="text" name="user_email" className="form-input" placeholder='email' required />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Senha</label>
              <div className="input-with-icon">
                <Lock size={18} className="input-icon" />
                <input type="password" name="user_password" className="form-input" placeholder='senha' required />
              </div>
            </div>

            <button type="submit" disabled={isSubmitting} className="btn-signin">
              <LogIn size={18} />
              {isSubmitting ? "Entrando..." : "Entrar"}
            </button>
          </form>
          <div className="signin-footer">
            <p>Novo por aqui? <a href="/signup">Crie uma conta</a></p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignIn;