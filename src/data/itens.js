// PRODUTOS
import biscoito from '../assets/biscoitinho.png';
import bolinha from '../assets/bolinha-cachorro.jpg';
import brinquedoGato from '../assets/brinquedo-gato.jpg';
import cama from '../assets/caminha-pet.jpg';
import coleira from '../assets/coleira.jpg';
import itemBanho from '../assets/item-banho.png';
import racaoDog from '../assets/racao-dog.jpg';
import racaoGato from '../assets/racao-gato.jpg';
import tijela from '../assets/tijela.png';


// SERVIÇOS
import adestramento from '../assets/adestramento.jpg';
import banho from '../assets/banho.jpg';
import taxi from '../assets/taxi-dog.jpg';
import tosa from '../assets/tosa.jpg';


export const listaItens = [
    // PRODUTOS
    { id: 1, nome: ["Biscoitinho"], categoria: "Produtos", preco: 80, src: biscoito },
    { id: 2, nome: ["bolinha"], categoria: "Produtos", preco: 50, src: bolinha },
    { id: 3, nome: ["Brinquedo de gato"], categoria: "Produtos", preco: 50, src: brinquedoGato },
    { id: 4, nome: ["cama"], categoria: "Produtos", preco: 120, src: cama },
    { id: 5, nome: ["coleira"], categoria: "Produtos", preco: 70, src: coleira },
    { id: 6, nome: ["produtos para banho"], categoria: "Produtos", preco: 160, src: itemBanho },
    { id: 7, nome: ["ração de cachorro"], categoria: "Produtos", preco: 120, src: racaoDog },
    { id: 8, nome: ["ração de gato"], categoria: "Produtos", preco: 120, src: racaoGato },
    { id: 9, nome: ["tijela"], categoria: "Produtos", preco: 30, src: tijela },

    // SERVIÇOS
    { id: 10, nome: ["adestramento"], categoria: "Serviços", preco: 300, src: adestramento },
    { id: 11, nome: ["banho e tosa"], categoria: "Serviços", preco: 150, src: banho },
    { id: 12, nome: ["táxi dog"], categoria: "Serviços", preco: 100, src: taxi },
    { id: 13, nome: ["tosa"], categoria: "Serviços", preco: 120, src: tosa },
];