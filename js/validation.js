/**
 * Validação de Formulário Avançado & Integração com ViaCEP
 * Validações nativas, cálculo de CPF e feedback acessível
 */

const FormValidator = {
  // Algoritmo matemático oficial de validação de CPF
  isValidCPF(cpf) {
    const cleanCPF = cpf.replace(/\D/g, '');
    if (cleanCPF.length !== 11) return false;
    
    // Elimina sequências com todos os dígitos iguais (ex: 111.111.111-11)
    if (/^(\d)\1+$/.test(cleanCPF)) return false;

    // Validação do 1º dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
    }
    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.charAt(9))) return false;

    // Validação do 2º dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.charAt(10))) return false;

    return true;
  },

  // Validação de E-mail
  isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },

  // Atualiza classes visuais e mensagem de feedback
  setFieldState(input, isValid, message = '') {
    const formGroup = input.closest('.form-group');
    if (!formGroup) return;

    const feedbackEl = formGroup.querySelector('.feedback-msg');

    if (isValid) {
      formGroup.classList.remove('is-invalid');
      formGroup.classList.add('is-valid');
      if (feedbackEl) {
        feedbackEl.className = 'feedback-msg hint';
        feedbackEl.textContent = '✓ Campo preenchido corretamente';
      }
    } else {
      formGroup.classList.remove('is-valid');
      formGroup.classList.add('is-invalid');
      if (feedbackEl) {
        feedbackEl.className = 'feedback-msg error';
        feedbackEl.textContent = message || 'Por favor, preencha este campo corretamente.';
      }
    }
  },

  // Consulta à API pública do ViaCEP
  async lookupCEP(cepValue) {
    const cleanCEP = cepValue.replace(/\D/g, '');
    const cepInput = document.getElementById('cep');
    const logradouroInput = document.getElementById('logradouro');
    const bairroInput = document.getElementById('bairro');
    const cidadeInput = document.getElementById('cidade');
    const estadoInput = document.getElementById('estado');
    const numeroInput = document.getElementById('numero');
    const cepFeedback = cepInput?.closest('.form-group')?.querySelector('.feedback-msg');

    if (cleanCEP.length !== 8) {
      this.setFieldState(cepInput, false, 'CEP deve conter 8 dígitos.');
      return;
    }

    if (cepFeedback) {
      cepFeedback.className = 'feedback-msg hint';
      cepFeedback.textContent = 'Buscando endereço via CEP...';
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCEP}/json/`);
      const data = await response.json();

      if (data.erro) {
        this.setFieldState(cepInput, false, 'CEP não encontrado. Verifique e tente novamente.');
        return;
      }

      // Preenchimento automático dos campos
      if (logradouroInput) logradouroInput.value = data.logradouro || '';
      if (bairroInput) bairroInput.value = data.bairro || '';
      if (cidadeInput) cidadeInput.value = data.localidade || '';
      if (estadoInput) estadoInput.value = data.uf || '';

      this.setFieldState(cepInput, true);
      if (logradouroInput) this.setFieldState(logradouroInput, true);
      if (bairroInput) this.setFieldState(bairroInput, true);
      if (cidadeInput) this.setFieldState(cidadeInput, true);
      if (estadoInput) this.setFieldState(estadoInput, true);

      // Foca automaticamente no campo número para agilizar a digitação
      if (numeroInput) numeroInput.focus();
    } catch (error) {
      console.warn('Erro ao consultar ViaCEP:', error);
      if (cepFeedback) {
        cepFeedback.className = 'feedback-msg hint';
        cepFeedback.textContent = 'Não foi possível preencher automaticamente. Insira manualmente.';
      }
    }
  }
};

// Eventos de inicialização
document.addEventListener('DOMContentLoaded', () => {
  const volunteerForm = document.getElementById('volunteerForm');
  if (!volunteerForm) return;

  const cpfInput = document.getElementById('cpf');
  const emailInput = document.getElementById('email');
  const cepInput = document.getElementById('cep');
  const phoneInput = document.getElementById('telefone');
  const nomeInput = document.getElementById('nome');

  // Validação do CPF ao sair do campo
  if (cpfInput) {
    cpfInput.addEventListener('blur', () => {
      if (cpfInput.value) {
        const valid = FormValidator.isValidCPF(cpfInput.value);
        FormValidator.setFieldState(cpfInput, valid, valid ? '' : 'CPF inválido. Verifique os dígitos digitados.');
      }
    });
  }

  // Validação do E-mail ao sair do campo
  if (emailInput) {
    emailInput.addEventListener('blur', () => {
      if (emailInput.value) {
        const valid = FormValidator.isValidEmail(emailInput.value);
        FormValidator.setFieldState(emailInput, valid, valid ? '' : 'Insira um formato de e-mail válido (ex: seu@email.com).');
      }
    });
  }

  // Consulta automática de CEP
  if (cepInput) {
    cepInput.addEventListener('blur', () => {
      if (cepInput.value) {
        FormValidator.lookupCEP(cepInput.value);
      }
    });
    
    // Ou ao completar 9 caracteres da máscara (00000-000)
    cepInput.addEventListener('input', () => {
      if (cepInput.value.replace(/\D/g, '').length === 8) {
        FormValidator.lookupCEP(cepInput.value);
      }
    });
  }

  // Envio do formulário
  volunteerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let isFormValid = true;

    // Checar campos obrigatórios
    const requiredInputs = volunteerForm.querySelectorAll('input[required], select[required], textarea[required]');
    requiredInputs.forEach(input => {
      if (!input.value.trim()) {
        FormValidator.setFieldState(input, false, 'Este campo é de preenchimento obrigatório.');
        isFormValid = false;
      }
    });

    // Validar CPF
    if (cpfInput && !FormValidator.isValidCPF(cpfInput.value)) {
      FormValidator.setFieldState(cpfInput, false, 'CPF inválido.');
      isFormValid = false;
    }

    // Validar E-mail
    if (emailInput && !FormValidator.isValidEmail(emailInput.value)) {
      FormValidator.setFieldState(emailInput, false, 'E-mail inválido.');
      isFormValid = false;
    }

    // Validar seleção de pelo menos uma área de interesse
    const checkedInterests = volunteerForm.querySelectorAll('input[name="area_interesse"]:checked');
    const interestError = document.getElementById('interestError');
    if (checkedInterests.length === 0) {
      if (interestError) interestError.style.display = 'block';
      isFormValid = false;
    } else {
      if (interestError) interestError.style.display = 'none';
    }

    // Validar termos obrigatórios
    const termosCheck = document.getElementById('termos');
    if (termosCheck && !termosCheck.checked) {
      isFormValid = false;
      alert('Você precisa aceitar os termos de adesão ao voluntariado para continuar.');
    }

    if (!isFormValid) {
      showToast('Atenção', 'Verifique os campos destacados em vermelho antes de prosseguir.', 'error');
      // Scroll suave até o primeiro campo inválido
      const firstInvalid = volunteerForm.querySelector('.is-invalid input, .is-invalid select, .is-invalid textarea');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Feedback de carregamento no botão
    const submitBtn = document.getElementById('submitBtn');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span> Enviando cadastro...';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      
      const nomeCompleto = nomeInput ? nomeInput.value.split(' ')[0] : 'Voluntário';
      showToast('Cadastro Realizado!', `Obrigado, ${nomeCompleto}! Seu cadastro foi recebido com sucesso pela equipe do Instituto.`, 'success');
      
      volunteerForm.reset();
      volunteerForm.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
        el.classList.remove('is-valid', 'is-invalid');
      });
    }, 1500);
  });
});
