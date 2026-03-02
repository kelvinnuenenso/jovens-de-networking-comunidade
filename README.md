# Jovens de Networking - Comunidade

Plataforma da comunidade Jovens de Networking para colaboração, aprendizado e conexões profissionais.

## Tecnologias Utilizadas

- **Vite** + **React** (TypeScript)
- **Supabase** (Autenticação e Banco de Dados)
- **Tailwind CSS** + **shadcn/ui** (Interface)
- **React Query** (Gerenciamento de Estado)
- **Vitest** (Testes)

## Como Começar Localmente

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/kelvinnuenenso/jovens-de-networking-comunidade.git
   cd jovens-de-networking-comunidade
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   - Copie o arquivo `.env.example` para `.env`.
   - Preencha com suas credenciais do Supabase.

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor local.
- `npm run build`: Gera a build de produção.
- `npm run lint`: Executa o linter.
- `npm run test`: Executa os testes unitários.

## Deploy

O projeto está configurado para ser buildado automaticamente via GitHub Actions. Para fazer o deploy em plataformas como Vercel ou Netlify, basta conectar este repositório do GitHub e configurar as variáveis de ambiente necessárias.

### Variáveis de Ambiente Necessárias para Deploy:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_PROJECT_ID`

## Licença

Este projeto é privado para a comunidade Jovens de Networking.
