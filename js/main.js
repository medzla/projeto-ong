/**
 * Script Principal - Instituto Esperança Viva
 * Controle de Tema (Dark/Light), Menu Mobile com Morphing, Modais Acessíveis e Toasts
 */

// --------------------------------------------------------------------------
// 1. Toast Notification Global
// --------------------------------------------------------------------------
function showToast(title, message, type = 'success') {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    toastContainer.setAttribute('role', 'region');
    toastContainer.setAttribute('aria-label', 'Notificações do sistema');
    document.body.appendChild(toastContainer);
  }

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  };
  const iconChar = icons[type] || 'ℹ';

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  toast.innerHTML = `
    <div class="toast-icon" aria-hidden="true">${iconChar}</div>
    <div class="toast-content">
      <h5>${title}</h5>
      <p>${message}</p>
    </div>
  `;

  toastContainer.appendChild(toast);

  // Animar entrada suave
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Remover após 4.5s
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 400);
  }, 4500);
}

// --------------------------------------------------------------------------
// 2. Controlador de Modais Acessíveis (WCAG Compliant)
// --------------------------------------------------------------------------
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  // Foco no botão de fechar para leitores de tela
  const closeBtn = modal.querySelector('.modal-close-btn');
  if (closeBtn) closeBtn.focus();
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// Fechamento de modal com tecla Escape ou clique fora
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const activeModals = document.querySelectorAll('.modal-overlay.active');
    activeModals.forEach(m => closeModal(m.id));
  }
});

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    closeModal(e.target.id);
  }
});

// --------------------------------------------------------------------------
// 3. Inicialização DOM
// --------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  // --- Alternador de Tema Claro / Escuro ---
  const themeToggleBtn = document.getElementById('themeToggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('ong_theme');

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (themeToggleBtn) themeToggleBtn.textContent = '☀️';
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    if (themeToggleBtn) themeToggleBtn.textContent = '🌙';
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('ong_theme', newTheme);
      themeToggleBtn.textContent = newTheme === 'dark' ? '☀️' : '🌙';
      showToast('Tema Atualizado', `Modo ${newTheme === 'dark' ? 'escuro' : 'claro'} ativado.`, 'success');
    });
  }

  // --- Menu Mobile Drawer com Morphing Hamburger & Backdrop ---
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');
  
  // Criar ou obter backdrop dinamicamente
  let navBackdrop = document.querySelector('.nav-backdrop');
  if (!navBackdrop) {
    navBackdrop = document.createElement('div');
    navBackdrop.className = 'nav-backdrop';
    document.body.appendChild(navBackdrop);
  }

  const toggleMobileNav = () => {
    const isOpen = mainNav.classList.toggle('open');
    mobileMenuBtn.classList.toggle('is-active', isOpen);
    navBackdrop.classList.toggle('show', isOpen);
    mobileMenuBtn.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', toggleMobileNav);
    navBackdrop.addEventListener('click', toggleMobileNav);

    // Fechar ao clicar em links (exceto se for toggle de submenu)
    mainNav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        if (link.classList.contains('dropdown-toggle')) {
          // No mobile ou desktop, clique no toggle abre ou fecha submenu
          return;
        }
        if (mainNav.classList.contains('open')) {
          toggleMobileNav();
        }
      });
    });
  }

  // --- Controle de Submenus Dropdown (Desktop & Mobile Accordion) ---
  const dropdownContainers = document.querySelectorAll('.nav-item-dropdown');

  dropdownContainers.forEach(container => {
    const toggleBtn = container.querySelector('.dropdown-toggle');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const willBeOpen = !container.classList.contains('is-open');
      
      // Fechar outros dropdowns abertos
      dropdownContainers.forEach(other => {
        if (other !== container) {
          other.classList.remove('is-open');
          const otherBtn = other.querySelector('.dropdown-toggle');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      container.classList.toggle('is-open', willBeOpen);
      toggleBtn.setAttribute('aria-expanded', willBeOpen ? 'true' : 'false');
    });
  });

  // Fechar dropdowns ao clicar fora
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item-dropdown')) {
      dropdownContainers.forEach(d => {
        d.classList.remove('is-open');
        const btn = d.querySelector('.dropdown-toggle');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // Fechar dropdowns com tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dropdownContainers.forEach(d => {
        if (d.classList.contains('is-open')) {
          d.classList.remove('is-open');
          const btn = d.querySelector('.dropdown-toggle');
          if (btn) {
            btn.setAttribute('aria-expanded', 'false');
            btn.focus();
          }
        }
      });
    }
  });

  // Fechar gaveta mobile ao clicar em item interno do submenu
  document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', () => {
      if (mainNav && mainNav.classList.contains('open')) {
        toggleMobileNav();
      }
    });
  });

  // --- Gerenciador de Alertas Contextuais (Descarte Acessível) ---
  document.addEventListener('click', (e) => {
    const closeBtn = e.target.closest('.alert-close');
    if (closeBtn) {
      const alertEl = closeBtn.closest('.alert');
      if (alertEl) {
        alertEl.classList.add('is-closing');
        setTimeout(() => {
          alertEl.remove();
        }, 320);
      }
    }
  });

  // --- Contadores Numéricos Animados com IntersectionObserver ---
  const counterElements = document.querySelectorAll('.metric-number');
  if (counterElements.length > 0) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const targetNum = parseInt(el.getAttribute('data-target') || '0', 10);
          const prefix = el.getAttribute('data-prefix') || '';
          const suffix = el.getAttribute('data-suffix') || '';
          const duration = 2000;
          const startTime = performance.now();

          const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Easing suave (easeOutExpo)
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const currentVal = Math.floor(easeProgress * targetNum);

            el.textContent = `${prefix}${currentVal.toLocaleString('pt-BR')}${suffix}`;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              el.textContent = `${prefix}${targetNum.toLocaleString('pt-BR')}${suffix}`;
            }
          };

          requestAnimationFrame(updateCounter);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.2 });

    counterElements.forEach(counter => observer.observe(counter));
  }

  // --- Identificar Página Ativa no Menu ---
  const currentPath = window.location.pathname.toLowerCase();
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href').toLowerCase();
    if (currentPath.endsWith(href) || (currentPath.endsWith('/') && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // --- Suporte a Estados Visuais para Testes & Capturas Automatizadas ---
  const urlParams = new URLSearchParams(window.location.search);
  const testState = urlParams.get('state');

  if (testState === 'dropdown') {
    const dropdown = document.querySelector('.nav-item-dropdown');
    if (dropdown) {
      dropdown.classList.add('is-open');
      const toggle = dropdown.querySelector('.dropdown-toggle');
      if (toggle) toggle.setAttribute('aria-expanded', 'true');
    }
  } else if (testState === 'mobile-menu') {
    if (mobileMenuBtn && mainNav) {
      mainNav.classList.add('open');
      mobileMenuBtn.classList.add('is-active');
      mobileMenuBtn.setAttribute('aria-expanded', 'true');
      const dropdown = document.querySelector('.nav-item-dropdown');
      if (dropdown) dropdown.classList.add('is-open');
    }
  } else if (testState === 'modal') {
    setTimeout(() => {
      openModal('projectModal');
    }, 150);
  }
});
