# Criação de Website Front-end para ONG e Publicação no GitHub

Este plano detalha a criação de um projeto front-end de alto impacto visual para uma **ONG (Organização Não Governamental)**, desenvolvido para se destacar no portfólio acadêmico e profissional, além de toda a configuração necessária para publicá-lo no seu **GitHub** (incluindo suporte nativo ao **GitHub Pages** para demonstração online).

---

## 🌟 Conceito do Projeto

Propomos a criação do **"Instituto Esperança Viva"** (ou tema personalizável, como sustentabilidade/meio ambiente ou proteção animal), uma ONG moderna com foco em impacto socioambiental e educação comunitária.

### Destaques Visuais e de Engenharia Front-end:
- **Design Moderno & Premium**: Paleta de cores sofisticada (tons de esmeralda, azul petróleo, detalhes dourados suaves e neutros elegantes), microinterações, tipografia moderna (Google Fonts) e efeito *glassmorphism*.
- **Sem Imagens de Placeholder**: Geração de imagens reais exclusivas em alta definição usando IA para o Hero e projetos da ONG.
- **Interatividade & Recursos**:
  - **Simulador de Doação**: Seleção rápida de valores (R$ 20, R$ 50, R$ 100 ou personalizado), cálculo de impacto em tempo real e modal com chave PIX / QR Code interativo para copiar e colar.
  - **Contadores de Impacto Animados**: Estatísticas dinâmicas ativadas ao rolar a página (*Intersection Observer*).
  - **Filtro de Projetos**: Galeria interativa de iniciativas com abas por categoria.
  - **Formulário de Voluntariado**: Modal estilizado com validação de campos em tempo real e notificações *Toast* animadas.
  - **Prestação de Contas (Transparência)**: Seção interativa com métricas visuais e relatórios resumidos.
  - **Dark / Light Mode**: Alternador de tema suave persistido no `localStorage`.
- **Arquitetura Leve e Escalável**: HTML5 semântico, Vanilla CSS moderno (variáveis, flexbox/grid, animações) e JavaScript ES6+ modular. Zero dependências pesadas, garantindo nota máxima no Lighthouse e deploy instantâneo no GitHub Pages.

---

## User Review Required

> [!IMPORTANT]
> **Estrutura de Pastas e Git**:
> Recomendamos criar o projeto em uma pasta dedicada `c:\Users\maduc\OneDrive\Documents\Faculdade Projetos\instituto-esperanca` (ou nome de sua preferência) e inicializar o repositório Git dentro dela. Isso evita que outros trabalhos da faculdade sejam misturados no mesmo repositório do GitHub.

> [!NOTE]
> **Subir no GitHub**:
> Você já possui Git configurado na máquina como **`medzla`** (`maducardoso201309@gmail.com`). 
> Ao final da implementação, deixaremos o repositório Git 100% inicializado, com os commits organizados e forneceremos as instruções exatas (em 2 comandos simples) para você criar o repositório no seu GitHub e fazer o push direto.

---

## Open Questions

> [!NOTE]
> Você prefere algum tema ou causa específica para a ONG?
> 1. **Socioambiental / Sustentabilidade e Reflorestamento** (Recomendado - estética verde moderna, apelo visual forte e elegante).
> 2. **Educação e Inclusão Social de Jovens** (Causas comunitárias, cursos e capacitação).
> 3. **Proteção e Resgate Animal** (Acolhimento, adoção e cuidados veterinários).
> *(Caso não especifique, iniciaremos com a opção 1, rica em apelo visual e métricas de impacto).*

---

## Proposed Changes

### Estrutura do Repositório (`instituto-esperanca/`)

#### [NEW] [index.html](file:///c:/Users/maduc/OneDrive/Documents/Faculdade%20Projetos/instituto-esperanca/index.html)
- Estrutura semântica completa (Header/Navbar responsiva, Hero interativo, Seção de Métricas de Impacto, Sobre Nós, Projetos com filtros, Transparência, Depoimentos, Simulador de Doação / PIX, Formulário de Voluntariado e Footer).
- Tags OpenGraph para pré-visualização no LinkedIn/WhatsApp/GitHub.

#### [NEW] [style.css](file:///c:/Users/maduc/OneDrive/Documents/Faculdade%20Projetos/instituto-esperanca/css/style.css)
- Design System em CSS Variables (cores, espaçamentos, tipografia, sombras e transições).
- Responsividade completa (Mobile, Tablet e Desktop).
- Suporte a Dark Mode / Light Mode com transição suave.
- Animações refinadas para modais, toasts e hover effects.

#### [NEW] [main.js](file:///c:/Users/maduc/OneDrive/Documents/Faculdade%20Projetos/instituto-esperanca/js/main.js)
- Lógica de interação:
  - Menu mobile e scroll suave para seções.
  - Contadores numéricos animados com `IntersectionObserver`.
  - Filtro dinâmico da galeria de projetos.
  - Simulador de doação com feedback de impacto e geração de modal PIX fictício interativo com botão de copiar código.
  - Modal e validação do formulário de voluntários com *Toast alerts*.
  - Alternador de tema (Dark/Light) com persistência em `localStorage`.

#### [NEW] [assets/images/](file:///c:/Users/maduc/OneDrive/Documents/Faculdade%20Projetos/instituto-esperanca/assets/images/)
- Imagens exclusivas geradas para a ONG (Hero banner, cartões de projetos em campo, voluntários em ação).

#### [NEW] [README.md](file:///c:/Users/maduc/OneDrive/Documents/Faculdade%20Projetos/instituto-esperanca/README.md)
- README padrão de excelência para o GitHub:
  - Badges de tecnologias (HTML5, CSS3, JavaScript, GitHub Pages, MIT License).
  - Demonstração visual e descrição dos objetivos do projeto.
  - Tecnologias e padrões de front-end utilizados.
  - Guia de como rodar localmente e como habilitar o GitHub Pages para ter o site no ar gratuitamente.

#### [NEW] [.gitignore](file:///c:/Users/maduc/OneDrive/Documents/Faculdade%20Projetos/instituto-esperanca/.gitignore)
- Arquivo para ignorar arquivos temporários e de sistema.

---

## Verification Plan

### Testes e Verificação
1. **Inspeção Visual e Interativa no Navegador**:
   - Abrir o site no navegador e validar responsividade (mobile, tablet e desktop).
   - Testar o simulador de doação, cálculo de valores e cópia de chave PIX.
   - Testar a filtragem de projetos e a abertura/fechamento dos modais.
   - Testar alternância entre modo claro e escuro.
2. **Validação Git**:
   - Confirmar inicialização do repositório local, branch `main`, `.gitignore` e commit inicial limpo.
   - Testar a integridade dos links relativos para compatibilidade com o GitHub Pages.
