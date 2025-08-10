# Desafio RedMax - Cadastro de Usuários

Este é um projeto Full-Stack desenvolvido como parte de um desafio técnico. A aplicação consiste em um sistema simples de cadastro e listagem de usuários.

## Tecnologias Utilizadas

O projeto é dividido em duas partes principais: o frontend e o backend.

### Frontend
- **Framework:** [Next.js](https://nextjs.org/) (com App Router)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Componentes UI:** [shadcn/ui](https://ui.shadcn.com/)
- **Requisições HTTP:** [Axios](https://axios-http.com/)

### Backend
- **Ambiente:** [Node.js](https://nodejs.org/)
- **Framework:** [Express.js](https://expressjs.com/pt-br/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Banco de Dados:** [SQLite](https://www.sqlite.org/index.html)

### DevOps
- **Containerização:** [Docker](https://www.docker.com/)
- **Orquestração:** [Docker Compose](https://docs.docker.com/compose/)

## Funcionalidades

- Listagem de usuários cadastrados.
- Tratamento de erros
- Formulário para cadastro de novos usuários.
- Validação de dados no backend.

## Pré-requisitos

Para executar este projeto, você precisará ter instalado em sua máquina:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/) (geralmente já vem com a instalação do Docker Desktop)

## Como Executar o Projeto

Siga os passos abaixo para configurar e rodar a aplicação em seu ambiente local.

**1. Clone o Repositório**
```bash
git clone <url-do-seu-repositorio>
cd desafio-redmax-junior
```

**Criar arquivo `.env` (backend) e `.env.local` (frontend) para teste**
```
> .env(backend)
DATABASE_URL="file:./banco.db"
PORT_BACKEND=3001
URL_FRONTEND = "http://localhost:3000"
```

```
> .env.local (frontend)
API_URL_INTERNAL=http://localhost:3001
NEXT_PUBLIC_API_URL_EXTERNAL=http://localhost:3001
```

**2. Inicie os Serviços com Docker Compose**

Na raiz do projeto (onde se encontra o arquivo `docker-compose.yml`), execute o seguinte comando. Ele irá construir as imagens do frontend e do backend e iniciar os containers.

```bash
docker-compose up --build
```

O comando pode levar alguns minutos na primeira vez, pois o Docker precisa baixar as imagens base e instalar todas as dependências.

**3. Acesse a Aplicação**

Após a conclusão do comando, os serviços estarão disponíveis nos seguintes endereços:

- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend:** [http://localhost:3001](http://localhost:3001)

## Estrutura do Projeto

```
.
├── backend/              # API
│   ├── prisma/           # Schema e migrações do Prisma
│   ├── src/              # Código fonte do backend
│   ├── Dockerfile        # Instruções para containerizar o backend
│   └── ...
├── frontend/             # Interface web
│   ├── src/              # Código fonte do frontend
│   ├── Dockerfile        # Instruções para containerizar o frontend
│   └── ...
├── docker-compose.yml    # Arquivo de orquestração dos serviços
└── README.md             # Documentação
```

## Endpoints da API

A API do backend expõe os seguintes endpoints, todos sob o prefixo `/api`:

- `GET /api/usuarios`: Retorna uma lista de todos os usuários.
- `POST /api/usuarios`: Cria um novo usuário.
