-- database: ./db.sqlite
CREATE TABLE usuarios(
    "name" TEXT,
    "CPF" TEXT NOT NULL UNIQUE PRIMARY KEY,
    "email" TEXT NOT NULL UNIQUE ,
    "password" TEXT NOT NULL);

CREATE TABLE pedidos(
    "id_pedido" INTEGER NOT NULL UNIQUE PRIMARY KEY,
    "data_pedido" TEXT NOT NULL,
    "valor_total" REAL NOT NULL,
    
    "CPF_fk_Usuario" TEXT NOT NULL,
    FOREIGN KEY("CPF_fk_Usuario") 
        REFERENCES usuarios("CPF")
        ON DELETE CASCADE
);

CREATE TABLE produtos(
    "id_produto" INTEGER NOT NULL UNIQUE PRIMARY KEY,
    "name" TEXT NOT NULL,
    "preco" REAL NOT NULL);

CREATE TABLE serviços(  
    "id_serviço" INTEGER NOT NULL UNIQUE PRIMARY KEY,
    "name" TEXT NOT NULL,
    "preco" REAL NOT NULL);


CREATE TABLE Item_Pedido_Serviço(
    "Quantidade" INTEGER,
    "Preço_unitário" REAL,
    "id_item" PRIMARY KEY,
    "id_fk_pedido" INTEGER NOT NULL,
    "id_fk_serviço" INTEGER NOT NULL,
    FOREIGN KEY("id_fk_pedido") 
        REFERENCES pedidos("id_pedido")
        ON DELETE CASCADE,
    FOREIGN KEY("id_fk_serviço") 
        REFERENCES serviços("id_serviço")
        ON DELETE CASCADE
);


CREATE TABLE Item_Pedido_Produto(
    "Quantidade" INTEGER,
    "Preço_unitário" REAL,
    "id_item" PRIMARY KEY,
    "id_fk_pedido" INTEGER NOT NULL,
    "id_fk_produto" INTEGER NOT NULL,
    FOREIGN KEY("id_fk_pedido") 
        REFERENCES pedidos("id_pedido")
        ON DELETE CASCADE,
    FOREIGN KEY("id_fk_produto") 
        REFERENCES produtos("id_produto")
        ON DELETE CASCADE
);
