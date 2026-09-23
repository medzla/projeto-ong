/**
 * Módulo de Projetos Sociais, Modais Interativos & Simulador de Doações
 * Filtros dinâmicos com animações fluidas, modal de dossiê e simulador PIX
 */

// Catálogo de Dossiês dos Projetos Sociais
const ProjectData = {
  'educacao': {
    title: 'Ler é Sonhar: Bibliotecas Comunitárias & Apoio Pedagógico',
    category: 'Educação Infantil',
    badge: 'Em Andamento',
    image: 'assets/images/project-educacao.jpg',
    description: 'O projeto Ler é Sonhar atua para transformar a realidade de crianças em comunidades vulneráveis por meio do acesso democrático à literatura infantil de qualidade, contação de histórias mediada por voluntários e oficinas lúdicas de reforço escolar no contraturno.',
    goal: '350 Crianças Atendidas',
    current: '273 Alunos Ativos (78%)',
    volunteers: '42 Voluntários Ativos',
    location: 'Polo Zona Leste & Comunidade Esperança',
    impact: 'Redução de 40% na evasão escolar e melhora substancial nos índices de letramento dos alunos atendidos nas escolas públicas parceiras.'
  },
  'ambiente': {
    title: 'Raízes do Amanhã: Reflorestamento e Preservação de Nascentes',
    category: 'Meio Ambiente & Clima',
    badge: 'Em Andamento',
    image: 'assets/images/project-meio-ambiente.jpg',
    description: 'A iniciativa Raízes do Amanhã recupera áreas degradadas de mananciais e matas ciliares urbanas e periurbanas, plantando espécies nativas da Mata Atlântica e capacitando pequenos produtores locais em técnicas agroflorestais sustentáveis.',
    goal: '10.000 Mudas Plantadas',
    current: '9.100 Mudas Cultivadas (91%)',
    volunteers: '85 Voluntários e Moradores',
    location: 'Bacia Hidrográfica do Rio Verde',
    impact: 'Proteção de 14 nascentes ativas e recomposição florestal de mais de 12 hectares de cobertura vegetal nativa.'
  },
  'tecnologia': {
    title: 'Código que Liberta: Lab Tech & Inclusão Produtiva',
    category: 'Inclusão Digital & TI',
    badge: 'Inscrições Abertas',
    image: 'assets/images/project-tecnologia.jpg',
    description: 'Laboratório tecnológico comunitário equipado com computadores conectados para formação de jovens do ensino público em programação web (HTML5, CSS3, JavaScript), raciocínio lógico e mentoria de carreira com profissionais de tecnologia.',
    goal: '60 Jovens Formados',
    current: '39 Matriculados (65%)',
    volunteers: '18 Mentores de TI',
    location: 'Hub de Inovação Social Comunitário',
    impact: 'Inserção de mais de 70% dos egressos das turmas anteriores em estágios e vagas iniciais de tecnologia da informação.'
  },
  'comunidade': {
    title: 'Hortas Urbanas e Nutrição Solidária',
    category: 'Segurança Alimentar',
    badge: 'Em Andamento',
    image: 'assets/images/hero.jpg',
    description: 'Transformação de terrenos ociosos em hortas comunitárias agroecológicas geridas pelas próprias famílias locais, garantindo alimentos saudáveis, frescos e sem agrotóxicos na mesa de quem mais precisa.',
    goal: '250 Famílias Beneficiadas',
    current: '210 Famílias Cadastradas (84%)',
    volunteers: '34 Voluntários Comunitários',
    location: 'Núcleos Urbanos Periféricos',
    impact: 'Colheita mensal de mais de 1,5 tonelada de legumes e verduras distribuídas gratuitamente para famílias cadastradas.'
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------------------
  // 1. Filtro de Projetos por Categoria
  // ------------------------------------------------------------------------
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            card.style.display = 'flex';
            requestAnimationFrame(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            });
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(15px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 250);
          }
        });
      });
    });
  }

  // ------------------------------------------------------------------------
  // 2. Interatividade do Modal de Detalhes do Projeto
  // ------------------------------------------------------------------------
  const detailButtons = document.querySelectorAll('.btn-details');
  const modalDetail = document.getElementById('projectDetailModal');

  if (detailButtons.length > 0 && modalDetail) {
    detailButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const card = btn.closest('.project-card');
        const cat = card ? card.getAttribute('data-category') : 'educacao';
        const data = ProjectData[cat] || ProjectData['educacao'];

        // Preencher modal dinamicamente
        const modalTitle = document.getElementById('modalProjectTitle');
        const modalImg = document.getElementById('modalProjectImg');
        const modalDesc = document.getElementById('modalProjectDesc');
        const modalGoal = document.getElementById('modalProjectGoal');
        const modalVolunteers = document.getElementById('modalProjectVolunteers');
        const modalLocation = document.getElementById('modalProjectLocation');
        const modalImpact = document.getElementById('modalProjectImpact');

        if (modalTitle) modalTitle.textContent = data.title;
        if (modalImg) {
          modalImg.src = data.image;
          modalImg.alt = data.title;
        }
        if (modalDesc) modalDesc.textContent = data.description;
        if (modalGoal) modalGoal.textContent = data.current;
        if (modalVolunteers) modalVolunteers.textContent = data.volunteers;
        if (modalLocation) modalLocation.textContent = data.location;
        if (modalImpact) modalImpact.textContent = data.impact;

        openModal('projectDetailModal');
      });
    });
  }

  // ------------------------------------------------------------------------
  // 3. Simulador de Doações & Modal PIX com QR Code
  // ------------------------------------------------------------------------
  const amountButtons = document.querySelectorAll('.amount-btn');
  const customInput = document.getElementById('customDonationInput');
  const selectedAmountDisplay = document.getElementById('selectedDonationAmount');
  const impactDisplay = document.getElementById('donationImpactText');
  const openPixModalBtn = document.getElementById('openPixModalBtn');

  const impacts = {
    '20': 'Fornece 2 kits de material escolar completo para crianças atendidas no projeto Ler é Sonhar.',
    '50': 'Garante o cultivo, adubação e manutenção de 5 mudas nativas em áreas de nascentes.',
    '100': 'Custeia 1 mês de acesso a laboratório e capacitação técnica para um jovem no Lab de Tecnologia.',
    '200': 'Garante 2 cestas agroecológicas completas de alimentos saudáveis para famílias vulneráveis.'
  };

  if (amountButtons.length > 0) {
    amountButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        amountButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const val = btn.getAttribute('data-value');
        if (customInput) customInput.value = '';
        if (selectedAmountDisplay) selectedAmountDisplay.textContent = `R$ ${val},00`;
        if (impactDisplay) impactDisplay.textContent = impacts[val] || 'Sua contribuição transforma vidas!';
      });
    });
  }

  if (customInput) {
    customInput.addEventListener('input', (e) => {
      amountButtons.forEach(b => b.classList.remove('active'));
      const val = e.target.value.replace(/\D/g, '');
      if (val) {
        if (selectedAmountDisplay) selectedAmountDisplay.textContent = `R$ ${val},00`;
        if (impactDisplay) impactDisplay.textContent = `Com R$ ${val},00 você apoia diretamente a manutenção de nossos projetos comunitários.`;
      } else {
        if (selectedAmountDisplay) selectedAmountDisplay.textContent = 'R$ 0,00';
        if (impactDisplay) impactDisplay.textContent = 'Selecione ou digite um valor para ver o impacto direto.';
      }
    });
  }

  // Abrir Modal de Doação PIX com QR Code
  if (openPixModalBtn) {
    openPixModalBtn.addEventListener('click', () => {
      const amount = selectedAmountDisplay ? selectedAmountDisplay.textContent : 'R$ 20,00';
      const pixModalAmount = document.getElementById('pixModalAmount');
      if (pixModalAmount) pixModalAmount.textContent = amount;
      openModal('pixModal');
    });
  }

  // Cópia de Chave PIX
  const copyPixBtns = document.querySelectorAll('.copy-pix-btn, #copyPixBtn');
  copyPixBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const pixKey = 'contato@institutoesperancaviva.org.br';
      navigator.clipboard.writeText(pixKey).then(() => {
        showToast('Chave PIX Copiada!', 'Chave oficial copiada. Cole no aplicativo do seu banco.', 'success');
        const orig = btn.innerHTML;
        btn.innerHTML = '✓ Chave Copiada!';
        setTimeout(() => {
          btn.innerHTML = orig;
        }, 3000);
      }).catch(() => {
        showToast('Info', `Chave PIX: ${pixKey}`, 'success');
      });
    });
  });
});
