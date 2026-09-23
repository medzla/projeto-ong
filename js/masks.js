/**
 * Mascaramento de Entradas (Vanilla JS)
 * Formata CPF, CEP e Telefone/Celular em tempo real
 */

const Masks = {
  // Máscara de CPF: 000.000.000-00
  cpf(value) {
    if (!value) return '';
    return value
      .replace(/\D/g, '') // remove tudo que não for dígito
      .slice(0, 11)       // limita a 11 dígitos
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  },

  // Máscara de CEP: 00000-000
  cep(value) {
    if (!value) return '';
    return value
      .replace(/\D/g, '')
      .slice(0, 8)
      .replace(/(\d{5})(\d{1,3})$/, '$1-$2');
  },

  // Máscara de Telefone: (00) 0000-0000 ou (00) 00000-0000 (Celular)
  phone(value) {
    if (!value) return '';
    let digits = value.replace(/\D/g, '').slice(0, 11);
    
    if (digits.length <= 10) {
      // Formato fixo: (00) 0000-0000
      return digits
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d{1,4})$/, '$1-$2');
    } else {
      // Formato celular: (00) 00000-0000
      return digits
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d{1,4})$/, '$1-$2');
    }
  }
};

// Inicialização automática dos campos com atributo data-mask
document.addEventListener('DOMContentLoaded', () => {
  const maskedInputs = document.querySelectorAll('[data-mask]');

  maskedInputs.forEach(input => {
    const maskType = input.getAttribute('data-mask');

    if (Masks[maskType]) {
      input.addEventListener('input', (e) => {
        const start = e.target.selectionStart;
        const previousLength = e.target.value.length;
        
        e.target.value = Masks[maskType](e.target.value);
        
        // Ajuste inteligente da posição do cursor
        const newLength = e.target.value.length;
        const diff = newLength - previousLength;
        e.target.setSelectionRange(start + diff, start + diff);
      });
    }
  });
});
