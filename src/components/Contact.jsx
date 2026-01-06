import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import "./Contact.css";
import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const formRef = useRef(null);
  const [isSending, setIsSending] = useState(false); // Estado para o botão de loading


  // FUNÇÃO PARA ENVIAR O E-MAIL
  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    // Substitua os campos abaixo pelos IDs do seu painel EmailJS
    const serviceID = "service_ce8wb7y";
    const templateID = "template_llj9xjp";
    const publicKey = "55du7wOqYDgfVpPG3";

    emailjs
      .sendForm(serviceID, templateID, e.target, publicKey)
      .then(
        (result) => {
          alert("Mensagem enviada com sucesso para a PIBARE!");
          e.target.reset(); // Limpa o formulário após enviar
        },
        (error) => {
          alert("Erro ao enviar mensagem: " + error.text);
        }
      )
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <section id="contato" className="contact-section">
      <div className="contact-container">
           <div className="contact-form-section">
            <div
              className="contact-form-wrapper"
              id="form-contato"
              ref={formRef}
            >
              <h3 className="contact-form-title">Envie uma Mensagem</h3>

              {/* ADICIONADO: onSubmit chamando sendEmail */}
              <form className="contact-form" onSubmit={sendEmail}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="user_name" // Use este nome no template do EmailJS: {{user_name}}
                      className="form-input"
                      placeholder="Seu nome completo"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      E-mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="user_email" // Template: {{user_email}}
                      className="form-input"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="contact_number" // Template: {{contact_number}}
                      className="form-input"
                      placeholder="(31) 99999-9999"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject" className="form-label">
                      Assunto
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      className="form-input"
                      required
                    >
                      <option value="">Selecione um assunto</option>
                      <option value="visita">Quero visitar a igreja</option>
                      <option value="ministerio">
                        Interesse em ministérios
                      </option>
                      <option value="oracao">Pedido de oração</option>
                      <option value="evento">Informações sobre eventos</option>
                      <option value="outro">Outro assunto</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    name="message" // Template: {{message}}
                    rows={6}
                    className="form-textarea"
                    placeholder="Escreva sua mensagem aqui..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="btn btn-primary btn-full btn-large form-submit"
                >
                  <Send className="btn-icon" />
                  {isSending ? "Enviando..." : "Enviar Mensagem"}
                </button>
              </form>
            </div>
          </div>
        </div>
    </section>
  );
};

export default Contact;
