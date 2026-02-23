import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import { ShoppingBag, User, Calendar, DollarSign, PlusCircle, Trash2, PackagePlus, MessageSquare } from 'lucide-react';

const AdminDashboard = () => {
  const [pedidos, setPedidos] = useState([]);

  const [stats, setStats] = useState({ total_vendas: 0, qtd_pedidos: 0, qtd_clientes: 0, ticket_medio: 0 });
  // Estados para o formulário de adição manual
  const [usuarios, setUsuarios] = useState([]);
  const [itensDisponiveis, setItensDisponiveis] = useState([]);
  
  const [selectedUserCpf, setSelectedUserCpf] = useState('');
  const [selectedItemId, setSelectedItemId] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [carrinhoAdmin, setCarrinhoAdmin] = useState([]); // Itens que o admin vai adicionar

  // Estado para cadastro de novo item (Produto/Serviço)
  const [novoItem, setNovoItem] = useState({ name: '', preco: '', imagem: 'biscoitinho.png', tipo: 'produto' });

  const [comentarios, setComentarios] = useState([]);

  const carregarDados = () => {
    //Carrega Pedidos
    fetch('http://localhost:8000/admin/pedidos')
      .then(res => res.json())
      .then(data => setPedidos(data))
      .catch(err => console.error("Erro ao carregar pedidos:", err));

    //Carrega Usuários para o select
    fetch('http://localhost:8000/admin/usuarios')
      .then(res => res.json())
      .then(data => setUsuarios(data))
      .catch(err => console.error("Erro ao carregar usuários:", err));

    //Carrega Itens (Produtos/Serviços) para o select
    fetch('http://localhost:8000/itens')
      .then(res => res.json())
      .then(data => setItensDisponiveis(data))
      .catch(err => console.error("Erro ao carregar itens:", err));

    //Carrega Estatísticas
    fetch('http://localhost:8000/admin/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error("Erro ao carregar stats:", err));

    //Carrega Comentários
    fetch('http://localhost:8000/comentarios')
      .then(res => res.json())
      .then(data => setComentarios(data))
      .catch(err => console.error("Erro ao carregar comentários:", err));
  };

  useEffect(() => {
    const userEmail = localStorage.getItem('user_email');
    
    if (userEmail !== 'admin@admin.com') {
      alert("Acesso Negado: Área restrita para administradores.");
      window.location.href = "/"; // Redireciona para a Home ou Login
      return;
    }

    carregarDados();
  }, []);

  // Adiciona item na lista temporária do admin
  const handleAddItem = (e) => {
    e.preventDefault();
    if (!selectedItemId || quantidade < 1) return;

    const [categoria, idStr] = selectedItemId.split('|');
    const id = parseInt(idStr);

    const itemOriginal = itensDisponiveis.find(i => i.id === id && i.categoria === categoria);
    if (!itemOriginal) return;

    const novoItem = {
      id: itemOriginal.id,
      nome: itemOriginal.nome[0], // O back retorna lista de nomes
      preco: itemOriginal.preco,
      quantidade: parseInt(quantidade)
    };

    setCarrinhoAdmin([...carrinhoAdmin, novoItem]);
    setQuantidade(1); // Reseta quantidade
  };

  // Remove item da lista temporária do admin
  const removerItemCarrinho = (index) => {
    const novoCarrinho = [...carrinhoAdmin];
    novoCarrinho.splice(index, 1);
    setCarrinhoAdmin(novoCarrinho);
  };

  // Add item na conta do cliente e finaliza pedido
  const finalizarPedidoAdmin = async () => {
    if (!selectedUserCpf || carrinhoAdmin.length === 0) {
      alert("Selecione um usuário e adicione pelo menos um item.");
      return;
    }

    const payload = {
      cpf_usuario: selectedUserCpf,
      itens: carrinhoAdmin
    };

    try {
      const response = await fetch('http://localhost:8000/finalizar-pedido', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert("Pedido criado com sucesso!");
        setCarrinhoAdmin([]);
        setSelectedUserCpf('');
        carregarDados(); // Recarrega a tabela
      } else {
        alert("Erro ao criar pedido.");
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  // Função para excluir pedido do banco de dados
  const handleDeleteOrder = async (id) => {
    if (!confirm(`Tem certeza que deseja excluir o pedido #${id}?`)) return;

    try {
      const response = await fetch(`http://localhost:8000/admin/pedido/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        alert("Pedido removido com sucesso!");
        carregarDados();
      } else {
        alert("Erro ao remover pedido.");
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  // Cadastra novo produto ou serviço
  const handleCreateItem = async (e) => {
    e.preventDefault();
    if (!novoItem.name || !novoItem.preco) {
      alert("Preencha nome e preço.");
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/admin/novo-item', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...novoItem,
          preco: parseFloat(novoItem.preco)
        })
      });

      if (response.ok) {
        alert("Item cadastrado com sucesso!");
        setNovoItem({ name: '', preco: '', imagem: 'biscoitinho.png', tipo: 'produto' });
        carregarDados(); // Atualiza a lista de itens disponíveis
      } else {
        alert("Erro ao cadastrar item.");
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <main className="admin-container">
      <div className="admin-container-header">
        <h1>Dashboard do Administrador</h1>
        <p>Acompanhamento de vendas e serviços contratados.</p>
      </div>

      {/* SEÇÃO DE CARDS */}
      <section className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon" style={{backgroundColor: '#e0f2fe', color: '#0284c7'}}><DollarSign size={24} /></div>
          <div className="stat-info">
            <h3>R$ {stats.total_vendas.toFixed(2)}</h3>
            <p>Faturamento Total</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{backgroundColor: '#dcfce7', color: '#16a34a'}}><ShoppingBag size={24} /></div>
          <div className="stat-info">
            <h3>{stats.qtd_pedidos}</h3>
            <p>Pedidos Realizados</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{backgroundColor: '#f3e8ff', color: '#9333ea'}}><User size={24} /></div>
          <div className="stat-info">
            <h3>{stats.qtd_clientes}</h3>
            <p>Clientes Cadastrados</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{backgroundColor: '#fff7ed', color: '#ea580c'}}><DollarSign size={24} /></div>
          <div className="stat-info">
            <h3>R$ {stats.ticket_medio.toFixed(2)}</h3>
            <p>Ticket Médio</p>
          </div>
        </div>
      </section>

      <section className="admin-add-order">
        <div className="header-add-order">
        <h3>Adicionar Pedido Manualmente</h3>
        </div>
        
        <div className="form-admin-row">
          <div className="form-group-admin">
            <label>Cliente:</label>
            <select 
              value={selectedUserCpf} 
              onChange={(e) => setSelectedUserCpf(e.target.value)}
              className='select'
            >
              <option value="">Selecione um cliente...</option>
              {usuarios.map(u => (
                <option key={u.CPF} value={u.CPF}>{u.name} ({u.CPF})</option>
              ))}
            </select>
          </div>

          <div className="form-group-admin">
            <label>Item:</label>
            <select 
              value={selectedItemId} 
              onChange={(e) => setSelectedItemId(e.target.value)}
              className='select'
            >
              <option value="">Selecione produto/serviço...</option>
              {itensDisponiveis.map(item => (
                <option key={`${item.categoria}-${item.id}`} value={`${item.categoria}|${item.id}`}>
                  {item.nome[0]} - R$ {item.preco}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group-admin small">
            <label>Qtd:</label>
            <input 
              type="number" 
              min="1" 
              value={quantidade} 
              onChange={(e) => setQuantidade(e.target.value)} 
              className='select'
            />
          </div>
          <div className="formata">
          <button className="btn-add-item" onClick={handleAddItem}>Adicionar Item</button>
          </div>
        </div>

        {carrinhoAdmin.length > 0 && (
          <div className="preview-pedido">
            <h4>Itens a adicionar:</h4>
            <ul>
              {carrinhoAdmin.map((item, idx) => (
                <li key={idx}>
                  {item.quantidade}x {item.nome} (R$ {item.preco * item.quantidade})
                  <button onClick={() => removerItemCarrinho(idx)} className="btn-remove-mini">
                    <Trash2 size={14} />
                  </button>
                </li>
              ))}
            </ul>
            <div className="total-preview">
              Total: R$ {carrinhoAdmin.reduce((acc, item) => acc + (item.preco * item.quantidade), 0).toFixed(2)}
            </div>
            <button className="btn-finalizar-admin" onClick={finalizarPedidoAdmin}>
              Confirmar e Criar Pedido
            </button>
          </div>
        )}
      </section>

      <section className="admin-add-order" style={{ marginTop: '2rem' }}>
        <div className="header-add-order">
          <h3><PackagePlus size={20} style={{ marginRight: '8px' }}/> Cadastrar Novo Item</h3>
        </div>
        
        <div className="form-admin-row">
          <div className="form-group-admin">
            <label>Nome do Item:</label>
            <input 
              type="text" 
              className='select'
              placeholder="Ex: Nova Ração"
              value={novoItem.name}
              onChange={(e) => setNovoItem({...novoItem, name: e.target.value})}
            />
          </div>

          <div className="form-group-admin">
            <label>Preço (R$):</label>
            <input 
              type="number" 
              className='select'
              placeholder="0.00"
              value={novoItem.preco}
              onChange={(e) => setNovoItem({...novoItem, preco: e.target.value})}
            />
          </div>

          <div className="form-group-admin">
            <label>Tipo:</label>
            <select 
              className='select'
              value={novoItem.tipo}
              onChange={(e) => setNovoItem({...novoItem, tipo: e.target.value})}
            >
              <option value="produto">Produto</option>
              <option value="servico">Serviço</option>
            </select>
          </div>

          <div className="formata">
            <button className="btn-add-item" onClick={handleCreateItem}>Salvar Item</button>
          </div>
        </div>
      </section>

      <section className="admin-add-order" style={{ marginTop: '2rem' }}>
        <div className="header-add-order">
          <h3><MessageSquare size={20} style={{ marginRight: '8px' }}/> Comentários Recentes</h3>
        </div>
        <div style={{ padding: '1.5rem' }}>
          {comentarios.length > 0 ? (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {comentarios.map((c) => (
                <li key={c.id} style={{ 
                  borderBottom: '1px solid #eee', 
                  paddingBottom: '10px', 
                  marginBottom: '10px' 
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <strong>{c.nome}</strong>
                    <span style={{ fontSize: '0.85rem', color: '#666' }}>{c.data}</span>
                  </div>
                  <p style={{ margin: 0, color: '#444', fontStyle: 'italic' }}>"{c.mensagem}"</p>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: '#666', textAlign: 'center' }}>Nenhum comentário ainda.</p>
          )}
        </div>
      </section>

      <div className="tabela-responsive">
        <table className="tabela-pedidos">
          <thead>
            <tr>
              <th>ID</th>
              <th><Calendar size={16} /> Data</th>
              <th><User size={16} /> Cliente (CPF)</th>
              <th><ShoppingBag size={16} /> Itens Comprados</th>
              <th><DollarSign size={16} /> Total</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.length > 0 ? (
              pedidos.map((pedido) => (
                <tr key={pedido.id}>
                  <td className="col-id">#{pedido.id}</td>
                  <td>{pedido.data}</td>
                  <td>
                    <strong>{pedido.cliente}</strong>
                    <br />
                    <span className="cpf-text">{pedido.cpf}</span>
                  </td>
                  <td>
                    <ul className="lista-itens-admin">
                      {pedido.detalhes.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="col-total">
                    R$ {pedido.total.toFixed(2)}
                  </td>
                  <td>
                    <button onClick={() => handleDeleteOrder(pedido.id)} className="btn-remove-mini" title="Excluir Pedido">
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="sem-pedidos">Nenhum pedido encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default AdminDashboard;