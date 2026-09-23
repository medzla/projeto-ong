/**
 * Módulo de Projetos Sociais & Simulador de Doações
 * Filtros dinâmicos, modais e integração de doação PIX
 */

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------------------
  // Filtro de Projetos por Categoria
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
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 50);
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
  // Simulador de Doações
  // ------------------------------------------------------------------------
  const amountButtons = document.querySelectorAll('.amount-btn');
  const customInput = document.getElementById('customDonationInput');
  const selectedAmountDisplay = document.getElementById('selectedDonationAmount');
  const impactImpactDisplay = document.getElementById('donationImpactText');

  const impacts = {
    '20': 'Fornece 2 kits de material escolar para crianças atendidas no projeto Ler é Sonhar.',
    '50': 'Garante o plantio e manutenção de 5 mudas nativas em áreas degradadas.',
    '100': 'Custeia 1 mês de acesso à internet e capacitação técnica para um jovem no Lab de Tecnologia.',
    '200': 'Alimenta 4 famílias em situação de vulnerabilidade com cestas agroecológicas completas.'
  };

  if (amountButtons.length > 0) {
    amountButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        amountButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const val = btn.getAttribute('data-value');
        if (customInput) customInput.value = '';
        if (selectedAmountDisplay) selectedAmountDisplay.textContent = `R$ ${val},00`;
        if (impactImpactDisplay) impactImpactDisplay.textContent = impacts[val] || 'Sua doação transforma vidas!';
      });
    });
  }

  if (customInput) {
    customInput.addEventListener('input', (e) => {
      amountButtons.forEach(b => b.classList.remove('active'));
      const val = e.target.value.replace(/\D/g, '');
      if (val) {
        if (selectedAmountDisplay) selectedAmountDisplay.textContent = `R$ ${val},00`;
        if (impactImpactDisplay) impactImpactDisplay.textContent = `Com R$ ${val},00 você apoia diretamente nossos projetos sociais em andamento.`;
      } else {
        if (selectedAmountDisplay) selectedAmountDisplay.textContent = 'R$ 0,00';
        if (impactImpactDisplay) impactImpactDisplay.textContent = 'Selecione ou digite um valor para ver o impacto direto.';
      }
    });
  }

  // ------------------------------------------------------------------------
  // Cópia de Chave PIX
  // ------------------------------------------------------------------------
  const copyPixBtn = document.getElementById('copyPixBtn');
  if (copyPixBtn) {
    copyPixBtn.addEventListener('click', () => {
      const pixKey = 'contato@institutoesperancaviva.org.br';
      navigator.clipboard.writeText(pixKey).then(() => {
        showToast('Chave PIX Copiada!', 'Chave CNPJ/E-mail copiada para a área de transferência.', 'success');
        copyPixBtn.textContent = '✓ Copiado com Sucesso!';
        setTimeout(() => {
          copyPixBtn.innerHTML = '📋 Copiar Chave PIX';
        }, 3000);
      }).catch(() => {
        showToast('Info', `Chave PIX: ${pixKey}`, 'success');
      });
    });
  }
});
