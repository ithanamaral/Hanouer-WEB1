import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import './Products.css';
import { listaItens } from '../data/itens';

function Products() {
  const [quantidades, setQuantidades] = useState({});

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
    
    // 1. Pega o carrinho atual ou cria um array vazio
    const carrinhoExistente = JSON.parse(localStorage.getItem('carrinho')) || [];

    // 2. Verifica se o item já está no carrinho para apenas somar a quantidade
    const index = carrinhoExistente.findIndex((i) => i.id === item.id);

    if (index !== -1) {
      carrinhoExistente[index].quantidade += qtd;
    } else {
      // Adiciona novo objeto com os dados necessários
      carrinhoExistente.push({
        id: item.id,
        nome: item.nome[0],
        preco: item.preco,
        src: item.src,
        quantidade: qtd
      });
    }

    // 3. Salva de volta no LocalStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinhoExistente));
    
    alert(`${qtd}x ${item.nome[0]} adicionado(s) ao carrinho!`);
  };

  
 return (
  <main className='products-grid'> 
    <div className="card-resultado">
      {listaItens
        .filter(item => item.categoria === 'Produtos')
        .map((item) => {
          // A lógica de quantidade deve ficar aqui dentro
          const qtdDesteItem = quantidades[item.id] || 1;

          return (
            <div key={item.id} className="produto-card">
              <div className="card-image-container">
                <img src={item.src} alt={item.nome[0]} className="card-img" />
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