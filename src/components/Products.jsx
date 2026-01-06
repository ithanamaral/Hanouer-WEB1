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

              <button className="btn-ver">Adicionar ao Carrinho</button>
            </div>
          );
        })}
    </div>
  </main>
);
}

export default Products;