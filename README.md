Software para calculo de # AVCB App - React Native + NestJS

Uma aplicação mobile completa desenvolvida com React Native para o frontend e NestJS para o backend, implementando as melhores práticas para desenvolvimento offline-first.

## 🚀 Tecnologias Utilizadas

### Frontend Mobile (React Native)
- **React Native** (TypeScript) - Framework para desenvolvimento móvel
- **TanStack Query** - Gerenciamento de estado e cache para chamadas à API
- **WatermelonDB** - Banco de dados local para funcionalidade offline
- **SQLite** - Armazenamento de dados local
- **NetInfo** - Detecção de conectividade de rede
- **Background Fetch** - Sincronização em background

### Backend (NestJS)
- **Node.js + NestJS** (TypeScript) - Framework backend robusto e escalável
- **Prisma ORM** - ORM moderno para acesso ao banco de dados
- **SQLite** - Banco de dados (facilmente alterável para PostgreSQL/MySQL)
- **JWT** - Autenticação baseada em tokens
- **bcryptjs** - Hash de senhas
- **Passport** - Middleware de autenticação

## 📁 Estrutura do Projeto

```
avcb/
├── mobile/                 # Aplicação React Native
│   ├── src/
│   │   ├── components/     # Componentes reutilizáveis
│   │   ├── screens/        # Telas da aplicação
│   │   ├── services/       # Serviços (API, Network)
│   │   ├── database/       # Configuração WatermelonDB
│   │   ├── types/          # Definições TypeScript
│   │   └── utils/          # Utilitários
│   ├── package.json
│   └── tsconfig.json
│
└── backend/                # API NestJS
    ├── src/
    │   ├── auth/           # Módulo de autenticação
    │   ├── users/          # Módulo de usuários
    │   ├── tasks/          # Módulo de tarefas
    │   ├── prisma/         # Configuração Prisma
    │   └── main.ts         # Arquivo principal
    ├── prisma/
    │   ├── schema.prisma   # Schema do banco
    │   └── migrations/     # Migrações
    ├── package.json
    └── tsconfig.json
```

## 🛠 Configuração e Instalação

### Pré-requisitos
- Node.js (v16 ou superior)
- npm ou yarn
- React Native CLI
- Android Studio (para Android)
- Xcode (para iOS - apenas macOS)

### Backend Setup

1. **Navegar para a pasta do backend:**
   ```bash
   cd backend
   ```

2. **Instalar dependências:**
   ```bash
   npm install
   ```

3. **Configurar variáveis de ambiente:**
   ```bash
   # Arquivo .env já está configurado com SQLite
   # Edite se necessário
   ```

4. **Executar migrações do banco:**
   ```bash
   npm run db:migrate
   ```

5. **Iniciar o servidor:**
   ```bash
   npm run start:dev
   ```

   O backend estará rodando em `http://localhost:3000`

### Mobile Setup

1. **Navegar para a pasta mobile:**
   ```bash
   cd mobile
   ```

2. **Instalar dependências:**
   ```bash
   npm install
   ```

3. **Para Android:**
   ```bash
   npm run android
   ```

4. **Para iOS:**
   ```bash
   npm run ios
   ```

## 📱 Funcionalidades

### ✅ Implementadas
- [x] Estrutura base do projeto React Native
- [x] Configuração TanStack Query
- [x] Configuração WatermelonDB para offline
- [x] Provider de rede com NetInfo
- [x] API NestJS com autenticação JWT
- [x] CRUD completo de usuários e tarefas
- [x] Schema Prisma configurado
- [x] Migração do banco de dados

### 🚧 Em Desenvolvimento
- [ ] Telas de interface do usuário
- [ ] Autenticação no frontend
- [ ] Sincronização offline/online
- [ ] Background sync
- [ ] Navegação entre telas
- [ ] Validação de formulários
- [ ] Tratamento de erros
- [ ] Testes unitários

## 🔄 Funcionalidade Offline-First

O app foi projetado para funcionar offline:

1. **Dados Local**: WatermelonDB armazena dados localmente
2. **Detecção de Rede**: NetInfo monitora conectividade
3. **Sincronização**: Quando online, sincroniza dados automaticamente
4. **Cache Inteligente**: TanStack Query gerencia cache das requisições

## 🌐 API Endpoints

### Autenticação
- `POST /api/auth/login` - Login de usuário
- `POST /api/auth/register` - Registro de usuário

### Usuários
- `GET /api/users` - Listar usuários
- `GET /api/users/:id` - Buscar usuário por ID
- `POST /api/users` - Criar usuário
- `PATCH /api/users/:id` - Atualizar usuário
- `DELETE /api/users/:id` - Deletar usuário

### Tarefas
- `GET /api/tasks` - Listar tarefas
- `GET /api/tasks/:id` - Buscar tarefa por ID
- `POST /api/tasks` - Criar tarefa
- `PATCH /api/tasks/:id` - Atualizar tarefa
- `DELETE /api/tasks/:id` - Deletar tarefa

## 🔧 Scripts Úteis

### Backend
```bash
npm run start:dev        # Desenvolvimento com hot reload
npm run build           # Build para produção
npm run start:prod      # Executar build de produção
npm run db:generate     # Gerar cliente Prisma
npm run db:migrate      # Executar migrações
npm run db:studio       # Abrir Prisma Studio
```

### Mobile
```bash
npm run android         # Executar no Android
npm run ios            # Executar no iOS
npm run start          # Iniciar Metro bundler
npm run type-check     # Verificar tipos TypeScript
```
