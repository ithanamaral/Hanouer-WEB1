import React, { useState, useEffect } from 'react';
import { Minus, Plus } from 'lucide-react';
import './Products.css';
import { imageMap } from '../data/itens';

function Products() {
  const [quantidades, setQuantidades] = useState({});
  const [itens, setItens] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/itens')
      .then(res => res.json())
      .then(data => setItens(data))
      .catch(err => console.error("Erro ao buscar produtos:", err));
  }, []);

  const alterarQuantidade = (id, operacao) => {
    setQuantidades((prev) => {
      const qtdAtual = prev[id] || 1;
      let novaQtd = operacao === 'aumentar' ? qtdAtual + 1 : qtdAtual - 1;
      if (novaQtd < 1) novaQtd = 1;
      return { ...prev, [id]: novaQtd };
    });
  };

  const adicionarAoCarrinho = (item) => {
    const qtd = quantidades[item.id] || 1;
    
    const carrinhoExistente = JSON.parse(localStorage.getItem('carrinho')) || [];

    const index = carrinhoExistente.findIndex((i) => i.id === item.id);

    if (index !== -1) {
      carrinhoExistente[index].quantidade += qtd;
    } else {
      // Adiciona novo objeto com os dados necessários
      carrinhoExistente.push({
        id: item.id,
        nome: item.nome[0],
        preco: item.preco,
        src: imageMap[item.imagem], // Salva o caminho resolvido no carrinho
        quantidade: qtd
      });
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinhoExistente));
    
    alert(`${qtd}x ${item.nome[0]} adicionado(s) ao carrinho!`);
  };

  
 return (
  <main className='products-grid'> 
    <div className="card-resultado">
      {itens
        .filter(item => item.categoria === 'Produtos')
        .map((item) => {
          const qtdDesteItem = quantidades[item.id] || 1;

          return (
            <div key={item.id} className="produto-card">
              <div className="card-image-container">
                {/* Usa o mapa para encontrar a imagem correta */}
                <img src={imageMap[item.imagem]} alt={item.nome[0]} className="card-img" />
              </div>
              
              <h3>{item.nome[0]}</h3>
              <p>{item.categoria}</p>
              <span>R$ {item.preco}</span>

              <div className="quantidade-control">
                <button onClick={() => alterarQuantidade(item.id, 'diminuir')} className="btn-qtd">
                  <Minus size={16} />
                </button>
                
                <span className="qtd-numero">{qtdDesteItem}</span>
                
                <button onClick={() => alterarQuantidade(item.id, 'aumentar')} className="btn-qtd">
                  <Plus size={16} />
                </button>
              </div>

              <button className="btn-ver" onClick={() => adicionarAoCarrinho(item)}>Adicionar ao Carrinho</button>
            </div>
          );
        })}
    </div>
  </main>
);
}

export default Products;