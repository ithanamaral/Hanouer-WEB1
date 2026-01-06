import React, { useState } from 'react'; // 1. Importar o useState
import { Minus, Plus } from 'lucide-react'; // Supondo que esteja usando lucide-react
import './Services.css';
import { listaItens } from '../data/itens';

function Services() {
  // 2. Estado para controlar as quantidades de cada item individualmente
  const [quantidades, setQuantidades] = useState({});

  const alterarQuantidade = (id, operacao) => {
    setQuantidades((prev) => {
      const qtdAtual = prev[id] || 1;
      let novaQtd = operacao === 'aumentar' ? qtdAtual + 1 : qtdAtual - 1;
      
      // Impede que a quantidade seja menor que 1
      if (novaQtd < 1) novaQtd = 1;

      return { ...prev, [id]: novaQtd };
    });
  };

  return (
    <main className='services-grid'>
        <div className="card-resultado">
        {listaItens.filter(item => item.categoria === 'Serviços').map((item) => {
            const qtdDesteItem = quantidades[item.id] || 1;

            // 3. O RETURN é obrigatório aqui dentro do MAP
            return (
            <div key={item.id} className="service-card"> 
                <div className="card-image-container">
                <img src={item.src} alt={item.nome[0]} className="card-img" />
                </div>
                
                <h3>{item.nome[0]}</h3>
                <p>{item.categoria}</p>
                <span>R$ {item.preco}</span>

                <div className="quantidade-control">
                <button 
                    onClick={() => alterarQuantidade(item.id, 'diminuir')}
                    className="btn-qtd"
                >
                    <Minus size={16} />
                </button>
                
                <span className="qtd-numero">{qtdDesteItem}</span>
                
                <button 
                    onClick={() => alterarQuantidade(item.id, 'aumentar')}
                    className="btn-qtd"
                >
                    <Plus size={16} />
                </button>
                </div>

                <button className="btn-ver">
                Adicionar ao Carrinho
                </button>
            </div>
            ); 
        })}
        </div>
    </main>
  );
}

export default Services;