from fastapi import FastAPI, Depends, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, Float, ForeignKey, func
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session, relationship
from pydantic import BaseModel
from typing import List
from datetime import datetime
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from contextlib import asynccontextmanager


# Cria um arquivo 'db.sqlite' na mesma pasta
SQLALCHEMY_DATABASE_URL = "sqlite:///./db.sqlite"
# Garante que o banco seja criado sempre na pasta onde está este arquivo (main.py)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "db.sqlite")
SQLALCHEMY_DATABASE_URL = f"sqlite:///{DB_PATH}"

print(f"--- BANCO DE DADOS LOCALIZADO EM: {DB_PATH} ---")

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class Usuario(Base):
    __tablename__ = "usuarios"
    cpf = Column("CPF", String, primary_key=True, index=True)
    nome = Column("name", String)
    email = Column("email", String, unique=True)
    senha = Column("password", String)

class Produto(Base):
    __tablename__ = "produtos"
    id = Column("id_produto", Integer, primary_key=True, index=True)
    name = Column("name", String)
    preco = Column("preco", Float)
    categoria = Column("categoria", String, default="Produtos")
    imagem = Column("imagem", String) # Ex: "biscoitinho.png"

class Servico(Base):
    __tablename__ = "serviços"
    id = Column("id_serviço", Integer, primary_key=True, index=True)
    name = Column("name", String)
    preco = Column("preco", Float)
    categoria = Column("categoria", String, default="Serviços")
    imagem = Column("imagem", String)

class Pedido(Base):
    __tablename__ = "pedidos"

    id = Column("id_pedido", Integer, primary_key=True, index=True)
    cpf_usuario = Column("CPF_fk_Usuario", String, ForeignKey("usuarios.CPF"))
    data_pedido = Column("data_pedido", String)
    valor_total = Column("valor_total", Float)

    # Relacionamento com itens
    itens = relationship("ItemPedido", back_populates="pedido")
    itens_servico = relationship("ItemPedidoServico", back_populates="pedido")
    usuario = relationship("Usuario") # Permite acessar dados do usuario a partir do pedido

class ItemPedido(Base):
    __tablename__ = "Item_Pedido_Produto"

    id = Column("id_item", Integer, primary_key=True, index=True)
    pedido_id = Column("id_fk_pedido", Integer, ForeignKey("pedidos.id_pedido"))
    produto_id = Column("id_fk_produto", Integer)
    nome_produto = Column("nome_produto", String)
    quantidade = Column("Quantidade", Integer)
    preco_unitario = Column("Preço_unitário", Float)

    pedido = relationship("Pedido", back_populates="itens")

class ItemPedidoServico(Base):
    __tablename__ = "Item_Pedido_Serviço"

    id = Column("id_item", Integer, primary_key=True, index=True)
    pedido_id = Column("id_fk_pedido", Integer, ForeignKey("pedidos.id_pedido"))
    servico_id = Column("id_fk_serviço", Integer)
    nome_servico = Column("nome_servico", String)
    quantidade = Column("Quantidade", Integer)
    preco_unitario = Column("Preço_unitário", Float)

    pedido = relationship("Pedido", back_populates="itens_servico")

class Comentario(Base):
    __tablename__ = "comentarios"
    id = Column("id", Integer, primary_key=True, index=True)
    nome = Column("nome", String)
    mensagem = Column("mensagem", String)
    data = Column("data", String)

# Cria as tabelas no banco de dados automaticamente
Base.metadata.create_all(bind=engine)

# --- POPULAR BANCO AO INICIAR (LIFESPAN) ---
@asynccontextmanager
async def lifespan(app: FastAPI):
    db = SessionLocal()
    if db.query(Produto).count() == 0 and db.query(Servico).count() == 0:
        print("Populando banco de dados com itens iniciais...")
        
      
        produtos_iniciais = [
            Produto(id=1, name="Biscoitinho", preco=80.0, categoria="Produtos", imagem="biscoitinho.png"),
            Produto(id=2, name="bolinha", preco=50.0, categoria="Produtos", imagem="bolinha-cachorro.jpg"),
            Produto(id=3, name="arranhadora de gato", preco=50.0, categoria="Produtos", imagem="brinquedo-gato.jpg"),
            Produto(id=4, name="cama", preco=120.0, categoria="Produtos", imagem="caminha-pet.jpg"),
            Produto(id=5, name="coleira", preco=70.0, categoria="Produtos", imagem="coleira.jpg"),
            Produto(id=6, name="produtos para banho", preco=160.0, categoria="Produtos", imagem="item-banho.png"),
            Produto(id=7, name="ração de cachorro", preco=120.0, categoria="Produtos", imagem="racao-dog.jpg"),
            Produto(id=8, name="ração de gato", preco=120.0, categoria="Produtos", imagem="racao-gato.jpg"),
            Produto(id=9, name="tijela", preco=30.0, categoria="Produtos", imagem="tijela.png"),
            Produto(id=10, name="perfumes", preco=35.0, categoria="Produtos", imagem="perfumes.png"),
            Produto(id=11, name="caixa de transportes", preco=40.0, categoria="Produtos", imagem="caixa de transportes.png"),
            Produto(id=12, name="presilhas de cabelo", preco=15.0, categoria="Produtos", imagem="presilhas de cabelo.png"),
            Produto(id=13, name="pelúcias", preco=25.0, categoria="Produtos", imagem="pelucias.png"),
            Produto(id=14, name="bifinhos", preco=50.0, categoria="Produtos", imagem="bifinhos.png"),
            Produto(id=15, name="areia de gato", preco=70.0, categoria="Produtos", imagem="areia de gato.png"),
            Produto(id=16, name="neutralizador de odor", preco=30.0, categoria="Produtos", imagem="neutralizador de odor.png"),
            Produto(id=17, name="vermífugos", preco=45.0, categoria="Produtos", imagem="vermifugo.png"),
        ]
        

        servicos_iniciais = [
            Servico(id=18, name="adestramento", preco=300.0, categoria="Serviços", imagem="adestramento.jpg"),
            Servico(id=19, name="banho e tosa", preco=150.0, categoria="Serviços", imagem="banho.jpg"),
            Servico(id=20, name="táxi dog", preco=100.0, categoria="Serviços", imagem="taxi-dog.jpg"),
            Servico(id=21, name="penteados especiais", preco=60.0, categoria="Serviços", imagem="penteado para cachorro.png"),
            Servico(id=22, name="Massoterapia e Cromoterapia", preco=100.0, categoria="Serviços", imagem="cromoterapia.png"),
            Servico(id=23, name="Passeio com cachorro", preco=70.0, categoria="Serviços", imagem="passeio com cachorro.png"),
            Servico(id=24, name="Curso de Cuidados para filhotes", preco=300.0, categoria="Serviços", imagem="cuidados com filhotes.png"),
            Servico(id=25, name="Limpeza de ouvidos", preco=80.0, categoria="Serviços", imagem="limpeza de ouvido.png"),

        ]
        
        db.add_all(produtos_iniciais)
        db.add_all(servicos_iniciais)
        db.commit()
    db.close()
    yield

# --- APP FASTAPI ---
app = FastAPI(lifespan=lifespan)

# Configuração de CORS para permitir requisições do Front End
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependência para pegar a sessão do banco
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- SCHEMAS (DADOS RECEBIDOS DO FRONT) ---
class ItemCarrinho(BaseModel):
    id: int
    quantidade: int
    preco: float

class PedidoSchema(BaseModel):
    cpf_usuario: str
    itens: List[ItemCarrinho]

class UsuarioCreate(BaseModel):
    name: str
    cpf: str
    email: str
    password: str

class UsuarioLogin(BaseModel):
    email: str
    password: str

class UsuarioUpdate(BaseModel):
    name: str
    email: str
    password: str

class NovoItemSchema(BaseModel):
    name: str
    preco: float
    tipo: str
    imagem: str = "biscoitinho.png"

class ComentarioSchema(BaseModel):
    nome: str
    mensagem: str


# --- ROTAS ---
@app.get("/itens")
def listar_itens(db: Session = Depends(get_db)):
    produtos = db.query(Produto).all()
    servicos = db.query(Servico).all()
    
    lista_completa = []
    
    for p in produtos:
        lista_completa.append({"id": p.id, "nome": [p.name], "preco": p.preco, "categoria": p.categoria, "imagem": p.imagem})
        
    for s in servicos:
        lista_completa.append({"id": s.id, "nome": [s.name], "preco": s.preco, "categoria": s.categoria, "imagem": s.imagem})
        
    return lista_completa

@app.get("/comentarios")
def listar_comentarios(db: Session = Depends(get_db)):
    return db.query(Comentario).order_by(Comentario.id.desc()).all()

@app.post("/comentarios")
def criar_comentario(comentario: ComentarioSchema, db: Session = Depends(get_db)):
    data_atual = datetime.now().strftime("%d/%m/%Y")
    novo_comentario = Comentario(
        nome=comentario.nome,
        mensagem=comentario.mensagem,
        data=data_atual
    )
    db.add(novo_comentario)
    db.commit()
    db.refresh(novo_comentario)
    return {"status": "sucesso", "id": novo_comentario.id, "data": data_atual}

@app.get("/admin/pedidos")
def listar_pedidos_admin(db: Session = Depends(get_db)):
    pedidos = db.query(Pedido).all()
    resultado = []
    
    for p in pedidos:
        lista_itens = []
        for item in p.itens:
            lista_itens.append(f"{item.quantidade}x {item.nome_produto} (R$ {item.preco_unitario})")
        for serv in p.itens_servico:
            lista_itens.append(f"{serv.quantidade}x {serv.nome_servico} (R$ {serv.preco_unitario})")
            
        resultado.append({
            "id": p.id,
            "data": p.data_pedido,
            "cliente": p.usuario.nome if p.usuario else "Cliente não encontrado",
            "cpf": p.cpf_usuario,
            "total": p.valor_total,
            "detalhes": lista_itens
        })
    return resultado

@app.get("/admin/stats")
def get_dashboard_stats(db: Session = Depends(get_db)):
    total_vendas = db.query(func.sum(Pedido.valor_total)).scalar() or 0.0
    qtd_pedidos = db.query(Pedido).count()
    qtd_clientes = db.query(Usuario).count()
    
    ticket_medio = total_vendas / qtd_pedidos if qtd_pedidos > 0 else 0

    return {
        "total_vendas": total_vendas,
        "qtd_pedidos": qtd_pedidos,
        "qtd_clientes": qtd_clientes,
        "ticket_medio": ticket_medio
    }

@app.get("/admin/usuarios")
def listar_usuarios_admin(db: Session = Depends(get_db)):
    usuarios = db.query(Usuario).all()
    return [{"CPF": u.cpf, "name": u.nome} for u in usuarios]

@app.delete("/admin/pedido/{id}")
def deletar_pedido(id: int, db: Session = Depends(get_db)):
    pedido = db.query(Pedido).filter(Pedido.id == id).first()
    if not pedido:
        raise HTTPException(status_code=404, detail="Pedido não encontrado")
    
    db.query(ItemPedido).filter(ItemPedido.pedido_id == id).delete()
    db.query(ItemPedidoServico).filter(ItemPedidoServico.pedido_id == id).delete()
    
    db.delete(pedido)
    db.commit()
    return {"status": "sucesso", "mensagem": "Pedido removido"}

@app.post("/admin/novo-item")
def criar_novo_item(item: NovoItemSchema, db: Session = Depends(get_db)):
    if item.tipo == "produto":
        max_id = db.query(func.max(Produto.id)).scalar() or 0
        novo = Produto(id=max_id + 1, name=item.name, preco=item.preco, imagem=item.imagem, categoria="Produtos")
        db.add(novo)
    
    elif item.tipo == "servico":
        max_id = db.query(func.max(Servico.id)).scalar() or 0
        novo = Servico(id=max_id + 1, name=item.name, preco=item.preco, imagem=item.imagem, categoria="Serviços")
        db.add(novo)
    
    else:
        raise HTTPException(status_code=400, detail="Tipo inválido. Use 'produto' ou 'servico'.")

    db.commit()
    return {"status": "sucesso"}

@app.post("/finalizar-pedido")
def finalizar_pedido(dados: PedidoSchema, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    usuario = db.query(Usuario).filter(Usuario.cpf == dados.cpf_usuario).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado. Faça login novamente.")

    # Calcula o total
    valor_total = sum(item.quantidade * item.preco for item in dados.itens)
    data_atual = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # Cria o Pedido
    # Gera ID manualmente para garantir que o pedido seja salvo corretamente
    max_id_pedido = db.query(func.max(Pedido.id)).scalar() or 0

    novo_pedido = Pedido(
        id=max_id_pedido + 1,
        cpf_usuario=dados.cpf_usuario,
        data_pedido=data_atual,
        valor_total=valor_total
    )
    db.add(novo_pedido)
    db.commit()
    db.refresh(novo_pedido)

    # Salva os Itens do Pedido
    # Busca o maior ID atual para incrementar manualmente (caso o banco não esteja como AUTOINCREMENT)
    max_id_prod = db.query(func.max(ItemPedido.id)).scalar() or 0
    max_id_serv = db.query(func.max(ItemPedidoServico.id)).scalar() or 0

    for item in dados.itens:
        # Verifica se é produto
        produto = db.query(Produto).filter(Produto.id == item.id).first()
        if produto:
            max_id_prod += 1
            novo_item = ItemPedido(
                id=max_id_prod,
                pedido_id=novo_pedido.id,
                produto_id=item.id,
                nome_produto=produto.name,
                quantidade=item.quantidade,
                preco_unitario=item.preco
            )
            db.add(novo_item)
        else:
            # Busca o serviço para pegar o nome
            servico = db.query(Servico).filter(Servico.id == item.id).first()
            if servico:
                max_id_serv += 1
                novo_item_serv = ItemPedidoServico(
                    id=max_id_serv,
                    pedido_id=novo_pedido.id,
                    servico_id=item.id,
                    nome_servico=servico.name,
                    quantidade=item.quantidade,
                    preco_unitario=item.preco
                )
                db.add(novo_item_serv)
    
    db.commit()

    return {"status": "sucesso", "pedido_id": novo_pedido.id}

@app.get("/usuario/{cpf}")
def get_usuario(cpf: str, db: Session = Depends(get_db)):
    user = db.query(Usuario).filter(Usuario.cpf == cpf).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    return {"cpf": user.cpf, "name": user.nome, "email": user.email, "password": user.senha}

@app.put("/usuario/{cpf}")
def atualizar_usuario(cpf: str, dados: UsuarioUpdate, db: Session = Depends(get_db)):
    user = db.query(Usuario).filter(Usuario.cpf == cpf).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    
    if dados.email != user.email:
        check_email = db.query(Usuario).filter(Usuario.email == dados.email).first()
        if check_email:
            raise HTTPException(status_code=400, detail="Email já cadastrado")

    user.nome = dados.name
    user.email = dados.email
    user.senha = dados.password
    
    db.commit()
    return {"status": "sucesso"}

@app.post("/signup")
def cadastrar_usuario(usuario: UsuarioCreate, db: Session = Depends(get_db)):
    db_user = db.query(Usuario).filter(Usuario.cpf == usuario.cpf).first()
    if db_user:
        raise HTTPException(status_code=400, detail="CPF já cadastrado")

    db_email = db.query(Usuario).filter(Usuario.email == usuario.email).first()
    if db_email:
        raise HTTPException(status_code=400, detail="Email já cadastrado")

    novo_usuario = Usuario(nome=usuario.name, cpf=usuario.cpf, email=usuario.email, senha=usuario.password)
    db.add(novo_usuario)
    db.commit()
    db.refresh(novo_usuario)
    return {"status": "sucesso", "usuario_cpf": novo_usuario.cpf}

@app.post("/login")
def login(dados: UsuarioLogin, db: Session = Depends(get_db)):
    # --- VERIFICAÇÃO DE ADMIN (MOCADO) ---
    if dados.email == "admin@admin.com" and dados.password == "admin":
        return {
            "status": "sucesso", 
            "user_cpf": "00000000000", 
            "user_name": "Administrador", 
            "user_email": "admin@admin.com", 
            "token": "admin-token-secret",
            "is_admin": True
        }

    user = db.query(Usuario).filter(Usuario.email == dados.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    if user.senha != dados.password:
        raise HTTPException(status_code=401, detail="Senha incorreta")
    return {"status": "sucesso", "user_cpf": user.cpf, "user_name": user.nome, "user_email": user.email, "token": "dummy-token"}