import React, { useState, useEffect } from 'react';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './carrinho.css';

function Carrinho() {
  const [itens, setItens] = useState([]);
  const navigate = useNavigate();

  // Carrega os itens do localStorage ao abrir a página
  useEffect(() => {
    const carrinhoSalvo = JSON.parse(localStorage.getItem('carrinho')) || [];
    setItens(carrinhoSalvo);
  }, []);

  // Atualiza a quantidade de um item já dentro do carrinho
  const atualizarQtd = (id, operacao) => {
    const novoCarrinho = itens.map(item => {
      if (item.id === id) {
        let novaQtd = operacao === 'mais' ? item.quantidade + 1 : item.quantidade - 1;
        return { ...item, quantidade: Math.max(1, novaQtd) };
      }
      return item;
    });
    setItens(novoCarrinho);
    localStorage.setItem('carrinho', JSON.stringify(novoCarrinho));
  };

  const removerItem = (id) => {
    const novoCarrinho = itens.filter(item => item.id !== id);
    setItens(novoCarrinho);
    localStorage.setItem('carrinho', JSON.stringify(novoCarrinho));
  };

const calcularTotal = () => {
  const total = itens.reduce((acc, item) => {
    const preco = parseFloat(String(item.preco).replace(',', '.').replace(/[^0-9.]/g, '')) || 0;
    const qtd = Number(item.quantidade) || 0;
    return acc + (preco * qtd);
  }, 0);
  return total.toFixed(2);
};

const finalizarCompra = async () => {
  const cpfLogado = localStorage.getItem('user_cpf'); // Pega o CPF do login

  if (!cpfLogado) {
    alert("Por favor, faça login para finalizar a compra.");
    navigate('/carrinho');
    return;
  }

  const corpoPedido = {
    cpf_usuario: cpfLogado,
    itens: itens.map(item => ({
      id: item.id,
      quantidade: item.quantidade,
      preco: item.preco
    }))
  };

  try {
    const response = await fetch("http://127.0.0.1:8000/finalizar-pedido", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(corpoPedido)
    });

    if (response.ok) {
      alert("Pedido salvo no banco de dados com sucesso!");
      localStorage.removeItem('carrinho'); 
      setItens([]);
      navigate('/home');
    } else {
      alert("Erro ao salvar pedido no servidor.");
    }
  } catch (error) {
    console.error("Erro na conexão:", error);
  }
};

  return (
    <div className="auth-page">
      <div className="auth-card carrinho-container">
        <header className="carrinho-header">
          <button className="btn-voltar" onClick={() => navigate('/home')}>
            <ArrowLeft size={20} />
          </button>
          <h2>Meu Carrinho</h2>
          <ShoppingCart size={24} color="#004aad" />
        </header>

        {itens.length === 0 ? (
          <div className="carrinho-vazio">
            <p>Sua sacola está vazia.</p>
            <button className="btn-primary" onClick={() => navigate('/home')}>Ver Produtos</button>
          </div>
        ) : (
          <div className="carrinho-lista">
            {itens.map((item) => (
              <div key={item.id} className="carrinho-item">
                <img src={item.src} alt={item.nome} className="item-img" />
                
                <div className="item-detalhes">
                  <h4>{item.nome}</h4>
                  <p>R$ {Number(item.preco).toFixed(2)}</p>
                </div>

                <div className="item-acoes">
                  <div className="qtd-seletor">
                    <button onClick={() => atualizarQtd(item.id, 'menos')}><Minus size={14} /></button>
                    
                    <span>{Number(item.quantidade)}</span>
                    <button onClick={() => atualizarQtd(item.id, 'mais')}><Plus size={14} /></button>
                  </div>
                  <button className="btn-remover" onClick={() => removerItem(item.id)}>
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}

            <div className="carrinho-resumo">
              <div className="resumo-linha">
                <span>Total:</span>
                <strong>R$ {calcularTotal()}</strong>
              </div>
              <button className="btn-primary"  onClick={finalizarCompra}>
                <CreditCard size={20} style={{marginRight: '8px'}} />
                Finalizar Compra
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Carrinho;