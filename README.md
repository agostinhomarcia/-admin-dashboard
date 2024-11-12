# Sistema de Gestão Empresarial

Um sistema de gestão empresarial moderno construído com Next.js 14, oferecendo uma interface intuitiva para gerenciamento de produtos, usuários e configurações do sistema.

![Dashboard Preview](admin-dashboard-delta-sand-59.vercel.app)

![Dashboard Preview](https://github.com/marciaagostinho/admin-dashboard-delta-sand-59/blob/main/public/preview.png)

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

## 📦 Estrutura do Projeto

src/
├── app/
│ ├── dashboard/
│ ├── login/
│ └── api/
├── components/
├── lib/
└── types/

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

4. Execute as migrações do banco de dados

```bash
npx prisma migrate dev
```

5. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

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

---

⭐️ Se este projeto te ajudou, considere dar uma estrela!
