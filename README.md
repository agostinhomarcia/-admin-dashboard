# Sistema de Gestão Empresarial

Um sistema de gestão empresarial moderno construído com Next.js 14, oferecendo uma interface intuitiva para gerenciamento de produtos, usuários e configurações do sistema.

![Projeto](https://admin-dashboard-delta-sand-59.vercel.app)

## 🚀 Features

### Implementadas

- ✅ Autenticação de usuários (Login/Logout)
- ✅ Dashboard com gráficos e métricas
- ✅ Gerenciamento de produtos
- ✅ Sistema de temas (Claro/Escuro)
- ✅ Layout responsivo
- ✅ Proteção de rotas

### Futuras

- 📋 Sistema de notificações em tempo real
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
- **Autenticação**: Next-Auth
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

- **User**
  ```prisma
  model User {
      id        String   @id @default(cuid())
      name      String
      email     String   @unique
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

- Todas as senhas são hasheadas usando bcrypt
- Conexões são feitas através de SSL/TLS
- Implementado rate limiting nas APIs
- Validação de dados com Zod
- Queries seguras através do Prisma ORM
- Proteção contra SQL injection

## 📊 Índices e Performance

- Índices automáticos em chaves primárias e estrangeiras
- Índices únicos em campos como email
- Relacionamentos otimizados através do Prisma
- Queries eficientes com select específico de campos

## 🔐 Credenciais de Teste

- **Usuário**: admin
- **Senha**: admin123

## 📱 Responsividade

O sistema é totalmente responsivo e se adapta aos seguintes breakpoints:

- Mobile: 360px+
- Tablet: 768px+
- Desktop: 1024px+

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 👨‍💻 Autor

Seu Nome - [Márcia](https://www.linkedin.com/in/marcia-agostinho-developer/)

## 🙏 Agradecimentos

- [Next.js](https://nextjs.org)
- [Vercel](https://vercel.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Prisma](https://prisma.io)

## 📸 Demonstração do Projeto

### Login e Autenticação

![Login](./public/images/home.gif)
_Sistema de login com tema claro/escuro e validação de campos_

### Dashboard

![Dashboard](./public/gifs/dashboard.gif)
_Visão geral do dashboard com gráficos e métricas_

### Gerenciamento de Produtos

![Produtos](./public/gifs/produtos.gif)
_CRUD completo de produtos com validações_

### Responsividade

![Responsivo](./public/gifs/responsivo.gif)
_Interface adaptável para diferentes dispositivos_

---

⭐️ Se este projeto te ajudou, considere dar uma estrela!
