const errors = {
    'auth/invalid-email': 'O e-mail fornecido é inválido.',
    'auth/missing-password': 'Senha obrigatória.',
    'auth/user-disabled': 'Este usuário foi desativado.',
    'auth/user-not-found': 'Nenhum usuário encontrado com esse e-mail.',
    'auth/wrong-password': 'A senha está incorreta.',
    'auth/weak-password': 'A senha deve conter no mínimo 8 caracteres.',
    'auth/email-already-in-use': 'Este e-mail já está em uso.',
    'auth/missing-email': 'Por favor, forneça um e-mail.',
    'auth/too-many-requests': 'Muitas tentativas. Tente novamente mais tarde.',
    'auth/network-request-failed': 'Falha na conexão de rede. Tente novamente.'
  };
  
  export default (code) => errors[code] || 'Ocorreu um erro desconhecido. Tente novamente.';
  