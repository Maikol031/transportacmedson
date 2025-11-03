// utils/ErrorCodes.ts
export const ERROR_CODES = {
  // Validações básicas
  REQUIRED: 'Campo obrigatório',
  MIN_LENGTH: (n: number) => `O campo deve possuir no mínimo ${n} caracteres`,
  MAX_LENGTH: (n: number) => `O campo pode possuir no máximo ${n} caracteres`,
  
  // Email e URL
  INVALID_EMAIL: 'E-mail inválido',
  INVALID_URL: 'URL inválida',
  
  // Números
  MIN_VALUE: (n: number) => `O valor mínimo é ${n}`,
  MAX_VALUE: (n: number) => `O valor máximo é ${n}`,
  NUMERIC_ONLY: 'O campo deve conter apenas números',
  
  // Datas
  INVALID_DATE: 'Data inválida',
  DATE_IN_PAST: 'A data não pode ser no passado',
  DATE_IN_FUTURE: 'A data não pode ser no futuro',
  
  // Documentos (Brasil)
  INVALID_CPF: 'CPF inválido',
  INVALID_CNPJ: 'CNPJ inválido',
  INVALID_CEP: 'CEP inválido',
  
  // Telefone e Placa
  INVALID_PHONE: 'Telefone inválido',
  INVALID_LICENSE_PLATE: 'Placa de veículo inválida',
  
  // Senha
  WEAK_PASSWORD: 'Senha fraca. Use maiúsculas, minúsculas, números e caracteres especiais',
  PASSWORD_MISMATCH: 'As senhas não coincidem',
  
  // Arquivo
  FILE_TOO_LARGE: (size: string) => `Arquivo muito grande. Máximo: ${size}`,
  INVALID_FILE_TYPE: (types: string) => `Tipo de arquivo inválido. Permitidos: ${types}`,
  
  // Match/Confirm
  FIELDS_DONT_MATCH: 'Os campos não coincidem',
  
  // Pattern
  INVALID_PATTERN: 'Formato inválido',
  
  // Caracteres especiais
  INVALID_CHARACTERS: 'O campo contém caracteres inválidos',
  NO_SPECIAL_CHARACTERS: 'O campo não pode conter caracteres especiais',
  
  // Duplicação
  ALREADY_EXISTS: 'Este valor já está registrado',
  DUPLICATE_VALUE: 'Valor duplicado',
} as const;
