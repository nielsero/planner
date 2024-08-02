# Planner

Planner é uma aplicação web para planeamento de viagens. Permite aos utilizadores planear viagens, convidar participantes, enviar confirmações por e-mail, adicionar atividades e links importantes, e gerir os detalhes da viagem. Este projecto é uma continuação do evento NLW Journey da Rocketseat.

## Tecnologias Utilizadas

### Servidor

- Node.js
- Fastify
- Prisma
- PostgreSQL
- Zod
- Nodemailer

### Web

- React
- Tailwind
- Tanstack Query

## Configuração e Instalação

### Requisitos

- Node.js (versão 20 ou superior)
- Docker e Docker Compose

### Passos para Configuração

1. Clone o repositório:

   ```bash
   git clone https://github.com/nielsero/planner.git
   cd planner
   ```

2. Instale as dependências no servidor:

   ```bash
   cd server
   npm install
   ```

3. Configure a base de dados PostgreSQL utilizando Docker Compose:

   ```bash
   docker compose up -d
   ```

4. Copie o ficheiro .env.example para .env:

   ```bash
   cp .env.example .env
   ```

5. Inicialize o Prisma e migre o esquema para a base de dados:

   ```bash
   npx prisma migrate dev
   ```

6. Inicie o servidor:

   ```bash
   npm run dev
   ```

7. Instale as dependências no cliente:

   ```bash
   cd ../web
   npm install
   ```

8. Copie o ficheiro .env.example para .env:

   ```bash
   cp .env.example .env
   ```

9. Inicie a aplicação cliente:

   ```bash
   npm run dev
   ```
