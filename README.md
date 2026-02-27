# Hanouer-WEB1
# **CSI606-2025-01 - Remoto - Proposta de Trabalho Final**

## *Discente: Íthan de Paula Amaral*

<!-- Descrever um resumo sobre o trabalho. -->

### Resumo

O **Hanouer** surge como uma solução digital inovadora para o segmento de Pet Shops, projetada para simplificar e modernizar a jornada de cuidado com os animais de estimação. A plataforma centraliza a aquisição de produtos e a contratação de serviços em um ambiente intuitivo, conectando tutores a tudo o que seus pets precisam. Com foco em praticidade e eficiência, o sistema oferece uma experiência de usuário fluida, desde a escolha do produto até o agendamento de serviços especializados.

<!-- Apresentar o tema. -->
### 1. Tema

Desenvolvimento de uma plataforma web *Full Stack* para gerenciamento e e-commerce de Pet Shops, integrando catálogo de produtos e serviços.

<!-- Descrever e limitar o escopo da aplicação. -->
### 2. Escopo

O projeto engloba o desenvolvimento de uma aplicação web robusta com as seguintes funcionalidades principais:
*   **E-commerce de Produtos:** Navegação por categorias, carrinho de compras e checkout.
*   **Gestão de Serviços:** Catálogo de serviços (banho, tosa, adestramento) disponíveis para contratação.
*   **Painel Administrativo (Dashboard):** Ferramenta para gestão de pedidos, controle de catálogo (CRUD de itens) e visualização de métricas de desempenho.
*   **Persistência de Dados:** Utilização de banco de dados relacional (SQLite) para armazenamento seguro de clientes, pedidos e inventário.

<!-- Apresentar restrições de funcionalidades e de escopo. -->
### 3. Restrições

Este projeto é desenvolvido para fins acadêmicos. As transações financeiras são simuladas para demonstrar o fluxo de negócios, não havendo integração real com operadoras de cartão de crédito ou gateways de pagamento bancário.

<!-- Construir alguns protótipos para a aplicação, disponibilizá-los no Github e descrever o que foi considerado. //-->
### 4. Protótipo

A interface do usuário foi concebida com foco na usabilidade e na estética moderna. O design abrange fluxos essenciais como vitrine de produtos, autenticação de usuários, dashboard administrativo e feedback de compra.
O protótipo de alta fidelidade, que guiou o desenvolvimento visual, pode ser consultado no link abaixo:
[Visualizar Protótipo no Canva](https://www.canva.com/design/DAG5ME5rixA/Ot9Sgz8GhQCL0B9Hvf0SJg/view?utm_content=DAG5ME5rixA&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h6dfb8e2891)

### 5. Como Executar o Projeto

Para rodar o projeto localmente, você precisará ter instalado o **Node.js** e o **Python**. Siga os passos abaixo:

#### 1. Instalação dos Pré-requisitos

Caso ainda não tenha instalado:

*   **Python (para o Back End):**
    *   Baixe e instale a versão mais recente em [python.org](https://www.python.org/downloads/).
    *   **Importante:** Durante a instalação, marque a opção **"Add Python to PATH"**.
*   **Node.js (para o Front End):**
    *   Baixe e instale a versão LTS (Long Term Support) em [nodejs.org](https://nodejs.org/en/download/).

#### 2. Configurando e Rodando o Back End (API)

O servidor é construído com Python e FastAPI.

1.  Abra o terminal (Prompt de Comando ou PowerShell) e navegue até a pasta `Back End` do projeto:
    ```bash
    cd "Back End"
    ```
2.  Instale as bibliotecas necessárias:
    ```bash
    pip install fastapi uvicorn sqlalchemy pydantic
    ```
3.  Inicie o servidor:
    ```bash
    uvicorn main:app --reload
    ```
    *   O servidor ficará rodando em: `http://127.0.0.1:8000`

#### 3. Configurando e Rodando o Front End (Site)

1.  Abra um **novo terminal** (não feche o do Back End) e navegue até a pasta raiz do projeto:
    ```bash
    cd Hanouer-WEB1
    ```
2.  Instale as dependências do projeto:
    ```bash
    npm install
    ```
3.  Execute o projeto:
    ```bash
    npm run dev
    ```
    *   O terminal mostrará o link de acesso local (geralmente `http://localhost:5173`).

#### 4. Acesso Administrativo

Para acessar o Dashboard do Administrador, utilize as seguintes credenciais disponíveis em mock, na tela de Login:
*   **Email:** `admin@admin.com`
*   **Senha:** `admin`
