# Sistema de Gestão Empresarial

Um sistema de gestão empresarial moderno construído com Next.js 14, oferecendo uma interface intuitiva para gerenciamento de produtos, usuários e configurações do sistema.

## 🏗️ Arquitetura

### Frontend

- Interface construída com React e Next.js 14
- Estilização com Tailwind CSS
- Componentes interativos
- Gráficos com Recharts
- Ícones com Lucide Icons

### Backend (API Routes Next.js)

- API Routes para endpoints do servidor
- Autenticação e autorização com NextAuth.js
- Integração com PostgreSQL via Prisma ORM
- Validação de dados com Zod
- Endpoints principais:
  - `/api/login`: Autenticação de usuários
  - `/api/products`: Gerenciamento de produtos
  - `/api/users`: Gerenciamento de usuários

### Segurança

- Proteção de rotas
- Validação de dados no servidor
- Sanitização de inputs
- Tokens JWT para autenticação
- Queries seguras com Prisma

🔗 [Ver Projeto](https://admin-dashboard-delta-sand-59.vercel.app/)

## 📸 Demonstração do Projeto

### Login/Dashboard

![Tema](https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGdqZnU3c3pvcWp1OXB0MWU1dW9sOTNyaHRhM3FwcjhjZTJld25kaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/a4jy4alkWns7SlugBf/giphy.gif)

### Gerenciamento de Usuários

![Usuários](https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3lrOGR5NWRndXNtdHE5eWE3azVmOXY4dmkycXFhbHhpZXNhamdiciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ewogbzxIGhXH8IrqPt/giphy.gif)

### Gerenciamento de Produtos

![Produtos](https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3lrOGR5NWRndXNtdHE5eWE3azVmOXY4dmkycXFhbHhpZXNhamdiciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ewogbzxIGhXH8IrqPt/giphy.gif)

### Configurações

![Configurações](https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzQyeHE1NnN6OWtzNjJ5dGg4dHExZ3JncHFpcjQzMzVxZGd0NXVuayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/s9FijT0zMpJu5vDLAg/giphy.gif)

## 🚀 Features

### 📋 Implementadas

- ✅ Autenticação de usuários (Login/Logout)
- ✅ Dashboard com gráficos e métricas
- ✅ Gerenciamento de produtos
- ✅ Gerenciamento de usuários
- ✅ Proteção de rotas

### 💾 Futuras

- 📊 Relatórios exportáveis (PDF, Excel)
- 👥 Gerenciamento de permissões de usuários
- 🔄 Sincronização offline
- 📨 Sistema de emails automatizados
- 🔍 Busca avançada
- 📦 Controle de estoque
- 💰 Gestão financeira
- 📈 Análise de dados avançada

## 🛠 Tecnologias Utilizadas

- **Framework**: Next.js 14
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS
- **Banco de Dados**: PostgreSQL
- **ORM**: Prisma
- **Gráficos**: Recharts
- **Ícones**: Lucide Icons
- **Deploy**: Vercel

## 🗄️ Estrutura do Banco de Dados

### Tabelas

- **Product**

  ```prisma
  model Product {
      id        String   @id @default(cuid())
      name      String
      price     Float
      stock     Int
      createdAt DateTime @default(now())
      updatedAt DateTime @updatedAt
  }
  ```

- **Role**

  ```prisma
  enum Role {
    ADMIN
    USER
  }
  ```

- **User**
  ```prisma
  model User {
      id        String   @id @default(cuid())
      name      String
      email     String   @unique
      role      String   @default("user")
      createdAt DateTime @default(now())
      updatedAt DateTime @updatedAt
  }
  ```

## 🚀 Como Executar

1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/nome-do-projeto.git
```

2. Instale as dependências

```bash
npm install
```

3. Configure as variáveis de ambiente

```bash
cp .env.example .env.local
```

Adicione as seguintes variáveis ao seu .env.local:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname?schema=public"
NEXTAUTH_SECRET=sua_chave_secreta
NEXTAUTH_URL=http://localhost:3000
```

4. Execute as migrações do Prisma

```bash
npx prisma migrate dev
```

5. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

## 💾 Backup e Restauração do Banco de Dados

### Backup

```bash
pg_dump -U seu_usuario nome_do_banco > backup.sql
```

### Restauração

```bash
psql -U seu_usuario nome_do_banco < backup.sql
```

## 🔐 Segurança do Banco de Dados

- ✅ Validação de dados com Zod
- ✅ Queries seguras através do Prisma ORM

## 🔐 Credenciais de Teste

- **Usuário**: admin
- **Senha**: admin123

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 👨‍💻 Autor

Seu Nome - [Márcia](https://www.linkedin.com/in/marcia-agostinho-developer/)

## 📱 Responsividade

O sistema foi completamente adaptado para oferecer uma experiência otimizada em diferentes dispositivos:

### 📱 Mobile (< 768px)

- Menu lateral colapsável
- Cards no lugar de tabelas para melhor visualização de dados
- Layout otimizado para toque
- Botões e elementos de interação adaptados para telas menores
- Formulários responsivos

### 💻 Tablet (768px - 1024px)

- Layout híbrido adaptativo
- Visualização de tabelas otimizada
- Sidebar com toggle automático
- Interface ajustada para diferentes orientações de tela

### 🖥️ Desktop (> 1024px)

- Layout completo com sidebar fixa
- Tabelas com todas as funcionalidades
- Aproveitamento máximo do espaço da tela
- Múltiplas colunas de dados

### 🎯 Principais Características Responsivas

- ✅ Layout fluido e adaptativo
- ✅ Imagens e mídia responsivas
- ✅ Tipografia responsiva
- ✅ Navegação adaptada para cada dispositivo
- ✅ Componentes otimizados para touch e mouse
- ✅ Performance otimizada em todos os dispositivos
