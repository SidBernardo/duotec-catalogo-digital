# DUOTEC - Catálogo Digital & Loja de Componentes Electrónicos

Catálogo interativo de componentes eletrónicos com gestão de catálogo, controlo de stock, carrinho de compras e envio directo de encomendas para o WhatsApp comercial.

---

## 🚀 Como Hospedar na Netlify

Este projecto já está totalmente configurado e optimizado com `netlify.toml` e ficheiro de redirecionamentos SPA (`_redirects`).

Existem **duas formas** muito simples de hospedar:

### Opção 1: Netlify Drop (Método Mais Rápido - Sem Git)
1. Certifique-se de que a build está gerada (execute `npm run build` se tiver feito novas alterações).
2. Aceda a [https://app.netlify.com/drop](https://app.netlify.com/drop) (faça login na sua conta Netlify).
3. Arraste e largue directamente a pasta **`dist`** que está na raiz deste projecto.
4. O seu site estará online imediatamente num URL público gratuito fornecido pela Netlify!

---

### Opção 2: Conectar ao GitHub / GitLab (Deploy Automático Contínuo)
1. Suba este código para um repositório no seu GitHub ou GitLab.
2. No painel da Netlify, clique em **"Add new site"** > **"Import an existing project"**.
3. Seleccione o repositório do projecto.
4. As configurações já serão detectadas automaticamente graças ao ficheiro [`netlify.toml`](./netlify.toml):
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Clique em **"Deploy"**. A cada actualização no repositório, a Netlify actualizará o site automaticamente.

---

## 💻 Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Iniciar servidor local de desenvolvimento
npm run dev

# Gerar build de produção
npm run build

# Pré-visualizar a build de produção localmente
npm run preview
```

---

## ⚙️ Características Técnicas
- **Frontend:** React 19 + TypeScript + Vite + Tailwind CSS
- **Persistência de Dados:** `localStorage` no browser (mantém configurações, produtos personalizados e histórico de encomendas sem necessidade de base de dados externa)
- **Checkout:** Geração automática e formatação de mensagem com detalhe da encomenda enviada directamente para o WhatsApp comercial
- **Gestão Integrada:** Painel de Gestor para alterar preços, stocks, dados da empresa e categorias
