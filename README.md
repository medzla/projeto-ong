# 🌿 Instituto Esperança Viva | Plataforma Front-end para ONG

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub_Pages-success?logo=github)](https://pages.github.com/)

> **Projeto acadêmico de desenvolvimento front-end estruturado e validado para o Terceiro Setor.**  
> Uma plataforma web moderna, acessível e de alto impacto visual para o **Instituto Esperança Viva**, organização socioambiental dedicada à educação comunitária, reflorestamento ecológico e capacitação profissional de jovens.

---

## 📖 Contexto

> As organizações do terceiro setor frequentemente lidam com recursos limitados e dependem enormemente do engajamento de voluntários e da captação de doações. A falta de uma plataforma digital clara, acessível e bem estruturada pode comprometer severamente a credibilidade institucional e dificultar a navegação dos apoiadores. O uso apropriado da semântica na linguagem HTML5 não é apenas uma boa prática de programação, mas um requisito essencial para garantir a correta indexação nos motores de busca (SEO) e fornecer um nível adequado de acessibilidade digital para todos os usuários.

---

## 🚩 Desafio

> Projetar e desenvolver um conjunto de páginas *web* utilizando o padrão HTML5 semântico, assegurando uma arquitetura de informação coerente e organizada em diretórios estruturados: uma página inicial (`index.html`) apresentando a ONG, uma página sobre iniciativas solidárias (`projetos.html`) e uma página de engajamento (`cadastro.html`). O grande destaque do desafio será implementar, nesta última, um formulário interativo completo contendo validações nativas e máscaras de entrada rigorosas (CPF, Telefone, CEP) para assegurar o registro íntegro de futuros colaboradores.

---

## 🎯 Atendimento Rigoroso ao Desafio (Etapas Práticas)

O projeto foi rigorosamente estruturado atendendo aos requisitos técnicos do itinerário prático:

### 1. Início da Experiência Prática
* **Recepção e Contextualização**: Definição da identidade do **Instituto Esperança Viva**, missão institucional, valores de sustentabilidade e responsabilidade cidadã.
* **Design System & Acessibilidade**:
  * Paleta de cores inspirada na natureza e na esperança (verde esmeralda `#059669`, azul petróleo `#0284c7`, toques âmbar e neutros refinados).
  * Tipografia moderna via Google Fonts: **Outfit** (títulos marcantes) e **Plus Jakarta Sans** (leitura fluida e acessível).
  * **Alternador de Tema (Dark / Light Mode)** nativo em CSS Variables e persistido no `localStorage`.
  * Fotografias reais em alta definição para o Hero e projetos sociais, sem uso de placeholders genéricos.

### 2. Estrutura Semântica e Páginas
* **`index.html` (Página Inicial Institucional)**:
  * Hierarquia semântica completa: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>` e `<footer>`.
  * **Hero Section** imersivo com selos de transparência e botões de ação rápida.
  * **Contadores de Impacto Animados** acionados ao rolar a página (*Intersection Observer*): +14.850 vidas impactadas, +48 comunidades, +32.400 mudas plantadas e +1.280 voluntários.
  * **Simulador Interativo de Doação PIX**: Valores rápidos (R$ 20, R$ 50, R$ 100, R$ 200) com impacto calculado e cópia instantânea da chave.
* **`projetos.html` (Galeria de Projetos Sociais)**:
  * Sistema de filtros por categoria em tempo real (*Todos*, *Educação & Infância*, *Meio Ambiente*, *Inclusão Digital* e *Apoio Comunitário*).
  * Cards semânticos estruturados com tags, status da iniciativa (*Em Andamento*, *Inscrições Abertas*), metas visuais com barra de progresso em porcentagem e botão para se voluntariar.

### 3. Formulários Interativos e Cadastro Avançado
* **`cadastro.html` (Ficha Oficial de Adesão ao Voluntariado)**:
  * **Agrupamento Lógico Semântico**: Estruturação obrigatória utilizando `<fieldset>` e `<legend>`:
    * **1. Dados Pessoais & Identificação**: Nome completo, CPF, Data de Nascimento, E-mail, Celular/WhatsApp e Área de Ocupação.
    * **2. Endereço Residencial**: CEP, Logradouro, Número, Complemento, Bairro, Cidade e UF.
    * **3. Perfil de Atuação & Disponibilidade**: Seleção interativa de áreas de interesse, dedicação semanal estimada em horas, turnos de atuação, envio de currículo e descrição de competências.
    * **4. Termos e Compromisso Social**: Declaração de adesão voluntária conforme a **Lei Federal nº 9.608/1998** e consentimento da **LGPD (Lei nº 13.709/2018)**.
  * **Tipos de Inputs Avançados do HTML5**:
    * `type="text"` com atributos `autocomplete="name"`, `minlength`, `maxlength` e `spellcheck="false"`.
    * `type="email"` com validação nativa de formato e `pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"`.
    * `type="date"` com limites de consistência (`min="1920-01-01"` e `max="2010-12-31"`).
    * `type="tel"` com `inputmode="tel"` e `pattern="\([0-9]{2}\)\s[0-9]{4,5}-[0-9]{4}"`.
    * `type="number"` para número residencial com `min="1"` e `max="999999"`.
    * `<datalist id="listaProfissoes">` integrado com `input list="listaProfissoes"` para autocompletar áreas de formação e competências.
    * `type="range"` com elemento semântico `<output>` interativo em tempo real para cálculo de disponibilidade semanal de horas (2 a 40 horas/semana).
    * `type="file"` estilizado para anexar currículo ou carta de apresentação nos formatos `.pdf`, `.doc` e `.docx` com feedback visual do arquivo selecionado.
  * **Máscaras de Entrada em Vanilla JS**: Formatação dinâmica e inteligente para CPF (`000.000.000-00`), CEP (`00000-000`) e Celular (`(00) 00000-0000`).
  * **Validação Algorítmica de CPF**: Cálculo dos dígitos verificadores matemáticos oficiais, rejeitando números inválidos e dígitos repetidos.
  * **Preenchimento Automático via API ViaCEP**: Busca assíncrona ao digitar o CEP, autopreenchendo rua, bairro, cidade e estado, focando automaticamente no campo número.
  * **Conformidade Técnica W3C & Acessibilidade**:
    * Código 100% validado conforme as diretrizes do **W3C HTML5 Validator**.
    * Associação estrita de todos os campos com `<label for="...">`, tags semânticas, `aria-required`, `aria-describedby` para leitores de tela e robôs de busca.
    * Feedback visual e sonoro com bordas verdes/vermelhas, mensagens com `aria-live` e notificações **Toast** animadas ao submeter.

---

## 📂 Arquitetura de Pastas e Arquivos

```text
Faculdade Projetos/ONG/
├── index.html              # Página Inicial institucional (Etapas 1 e 2)
├── projetos.html           # Página de Projetos Sociais com filtros (Etapa 2)
├── cadastro.html           # Formulário Avançado de Cadastro (Etapa 3)
├── README.md               # Documentação técnica e guia do repositório
├── .gitignore              # Filtro de arquivos de sistema e logs
├── css/
│   ├── style.css           # Design System global, variáveis, header, footer e toasts
│   ├── pages.css           # Estilos de seções (Hero, Métricas, Cards, Fieldsets)
│   └── responsive.css      # Responsividade e menu gaveta mobile
├── js/
│   ├── main.js             # Modo escuro/claro, menu mobile, contadores e toasts
│   ├── masks.js            # Máscaras de CPF, CEP e Telefone em JavaScript puro
│   ├── validation.js       # Validação de CPF, integração com ViaCEP e formulário
│   └── projects.js         # Filtros por categoria e simulador de doações PIX
└── assets/
    └── images/             # Fotografias em alta resolução das ações sociais
        ├── hero.jpg
        ├── project-educacao.jpg
        ├── project-meio-ambiente.jpg
        └── project-tecnologia.jpg
```

---

## 🎨 Design System e Estruturação CSS3 Avançada

O projeto utiliza o estado da arte do **CSS3 puro (Vanilla CSS)**, combinando técnicas de engenharia de software com design visual moderno:

### 1. Sistema de Design Tokens Consistente
* **Paleta Semântica**: Tokens primários (`--primary`, `--primary-light`, `--primary-dark`), secundários (`--secondary`), de destaque (`--accent`) e neutros equilibrados para os modos claro e escuro.
* **Escala de Espaçamento Modular**: De `--space-1` (4px) até `--space-20` (80px), garantindo ritmo vertical e horizontal harmônico.
* **Escala de Elevação & Z-Index**: 5 níveis de sombras com luz ambiente (`--shadow-sm` a `--shadow-xl`) e gerenciamento hierárquico estrito de camadas (`--z-dropdown`, `--z-sticky`, `--z-drawer`, `--z-backdrop`, `--z-modal`, `--z-toast`).
* **Tipografia Fluida**: Uso de funções CSS nativas `clamp()` para escalonamento automático de fontes de acordo com a largura da tela sem quebras abruptas.

### 2. Layouts Responsivos com CSS Grid e Flexbox
* **Grandes Blocos em CSS Grid**:
  * Hero Section em split-grid assimétrico (`1.15fr 0.85fr`).
  * Grade de métricas de impacto em 4 colunas com adaptação automática para 2 colunas e 1 coluna em telas menores.
  * Galeria de projetos sociais estruturada em grade de 3 colunas (`grid-template-columns: repeat(3, 1fr)`).
  * Formulário avançado com subgrades independentes para CEP/Número e Cidade/UF.
* **Componentes Internos com Flexbox**:
  * Navbar e cabeçalho alinhados com `justify-content: space-between` e `align-items: center`.
  * Cards de projetos com estrutura flexbox vertical (`flex-direction: column`) para manter o rodapé alinhado independentemente do tamanho do texto descritivo.
  * Indicadores de progresso e botões de ação com alinhamento dinâmico.

### 3. Navegação Interativa Desktop & Mobile
* **Desktop**: Header translúcido com efeito *glassmorphism* (`backdrop-filter: blur(14px)`), indicador animado de link ativo no rodapé de cada item.
* **Mobile Drawer**: Menu lateral deslizante com curva `cubic-bezier(0.16, 1, 0.3, 1)`, fundo escurecido com *backdrop blur* e **botão hamburger morfológico** que se transforma suavemente em um "X" através de rotações e translações CSS3 em 3 barras vetoriais.

### 4. Cartões, Modais e Componentes Auxiliares
* **Cartões Dinâmicos**: Elevação em hover (`translateY(-6px)`), zoom suave na fotografia e **efeito shimmer** animado na barra de progresso (`@keyframes shimmerProgress`).
* **Pílulas de Status**: Indicador visual com ponto pulsante contínuo (`@keyframes pulseDot`) para projetos em andamento e novas vagas.
* **Modais Acessíveis**: Dossiê detalhado dos projetos sociais e Simulador de QR Code PIX com backdrop blur, animação de entrada com escala, fechamento por clique externo ou tecla `Escape` e foco acessível.
* **Feedbacks de Formulário**: Anel de foco luminoso, validações visuais com ícones de sucesso/erro e cards de área de atuação com marcação em pop-check ao serem selecionados.

### 5. Acessibilidade Digital (WCAG AAA)
* **Alto Contraste no Foco**: Estilização estrita de `:focus-visible` com anel de 3px e deslocamento (`outline-offset: 3px`).
* **Redução de Movimento**: Suporte nativo à diretiva `@media (prefers-reduced-motion: reduce)` que desativa animações para usuários sensíveis.
* **Touch Targets Otimizados**: Todos os botões e links de toque possuem dimensões mínimas de 44x44px.
* **Estilo de Impressão**: Folha de estilos dedicada `@media print` otimizando a página para impressão limpa de relatórios da ONG.

---

## 💻 Tecnologias Utilizadas

* **HTML5 Semântico**: Estrutura acessível, tags semânticas, ARIA roles e metadados OpenGraph para SEO.
* **CSS3 Moderno**: 
  * Layout responsivo utilizando Flexbox e CSS Grid.
  * Variáveis customizadas CSS (`:root` e `[data-theme="dark"]`).
  * Microinterações, efeitos de *glassmorphism* e transições suaves.
* **JavaScript ES6+**:
  * Manipulação limpa de DOM sem dependências de frameworks externos (Zero dependências).
  * API nativa `IntersectionObserver` para contadores de impacto animados.
  * API `fetch` assíncrona para integração com o web service do ViaCEP.
  * API `navigator.clipboard` para cópia rápida da chave PIX.
* **Git & GitHub**: Versionamento de código, controle de branches e deploy contínuo.

---

## ⚡ Como Executar o Projeto Localmente

Como o projeto utiliza tecnologias web nativas (HTML5, CSS3 e JavaScript ES6+), não é necessário instalar nenhum gerenciador de pacotes ou compilador:

1. **Clone o repositório**:
   ```bash
   git clone git@github.com:medzla/projeto-ong.git
   ```

2. **Acesse a pasta do projeto**:
   ```bash
   cd projeto-ong
   ```

3. **Abra no navegador**:
   * Dê dois cliques no arquivo `index.html` ou abra com o seu navegador favorito (Google Chrome, Edge, Firefox).
   * Se utilizar a extensão *Live Server* no VS Code / IDE, basta clicar com o botão direito em `index.html` e selecionar **Open with Live Server**.

---

## 🌐 Publicação Online Gratuita no GitHub Pages

Para transformar o repositório em um site acessível na web pelo GitHub Pages:

1. No seu repositório no GitHub (`https://github.com/medzla/projeto-ong`), clique na aba **Settings** (Configurações).
2. No menu lateral esquerdo, clique em **Pages**.
3. Na seção **Build and deployment > Branch**:
   * Selecione a branch: **`main`**
   * Selecione a pasta: **`/ (root)`**
4. Clique no botão **Save**.
5. Em 1 a 2 minutos, o GitHub fornecerá a URL pública do projeto:
   `https://medzla.github.io/projeto-ong/`

---

## 📜 Licença & Declaração Acadêmica

Este projeto é disponibilizado sob a licença **MIT**. Desenvolvido com fins de estudo prático e demonstração de competências em desenvolvimento web front-end para o Terceiro Setor.

Desenvolvido por **[medzla](https://github.com/medzla)** • 2026
