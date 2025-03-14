const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPhone = (phone) => {
  const phoneRegex = /^(\(\d{2}\)\s?)?\d{5}-?\d{4}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const validateStudentData = (data) => {

  if (!data.name || data.name.trim().length === 0) {
    return 'O nome é obrigatório';
  } else if (data.name.trim().length < 3) {
    return 'O nome deve ter pelo menos 3 caracteres';
  }

  if (!data.email || data.email.trim().length === 0) {
    return 'O email é obrigatório';
  } else if (!isValidEmail(data.email)) {
    return 'Email inválido';
  }

  if (data.phone && !isValidPhone(data.phone)) {
    return 'Celular inválido. Use o formato (XX) XXXXX-XXXX';
  }
}; 