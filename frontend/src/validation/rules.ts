// validation/rules.ts
import { helpers, required, minLength, maxLength, email, numeric, minValue, maxValue, url, sameAs } from '@vuelidate/validators'
import { ERROR_CODES } from './errorCodes'

export const R = {
  // Básico
  required: () => helpers.withMessage(ERROR_CODES.REQUIRED, required),
  min: (n: number) => helpers.withMessage(ERROR_CODES.MIN_LENGTH(n), minLength(n)),
  max: (n: number) => helpers.withMessage(ERROR_CODES.MAX_LENGTH(n), maxLength(n)),
  
  // Email e URL
  email: () => helpers.withMessage(ERROR_CODES.INVALID_EMAIL, email),
  url: () => helpers.withMessage(ERROR_CODES.INVALID_URL, url),
  
  // Números
  numeric: () => helpers.withMessage(ERROR_CODES.NUMERIC_ONLY, numeric),
  minValue: (n: number) => helpers.withMessage(ERROR_CODES.MIN_VALUE(n), minValue(n)),
  maxValue: (n: number) => helpers.withMessage(ERROR_CODES.MAX_VALUE(n), maxValue(n)),
  
  // Customizados
  cpf: () => helpers.withMessage(ERROR_CODES.INVALID_CPF, (value: string) => validarCPF(value)),
  cnpj: () => helpers.withMessage(ERROR_CODES.INVALID_CNPJ, (value: string) => validarCNPJ(value)),
  cep: () => helpers.withMessage(ERROR_CODES.INVALID_CEP, (value: string) => /^\d{5}-?\d{3}$/.test(value)),
  phone: () => helpers.withMessage(ERROR_CODES.INVALID_PHONE, (value: string) => /^[\d\s\-\(\)]+$/.test(value) && value.replace(/\D/g, '').length >= 10),
  licensePlate: () => helpers.withMessage(ERROR_CODES.INVALID_LICENSE_PLATE, (value: string) => /^[A-Z]{3}\d{4}$|^[A-Z]\d{3}[A-Z]\d{2}$/.test(value.toUpperCase().replace(/\s/g, ''))),
  
  // Senha
  strongPassword: () => helpers.withMessage(
    ERROR_CODES.WEAK_PASSWORD,
    (value: string) => {
      const hasUpper = /[A-Z]/.test(value)
      const hasLower = /[a-z]/.test(value)
      const hasNumber = /\d/.test(value)
      const hasSpecial = /[!@#$%^&*]/.test(value)
      return hasUpper && hasLower && hasNumber && hasSpecial && value.length >= 8
    }
  ),
  
  // Match de campos
  sameAs: (fieldValue: string) => helpers.withMessage(ERROR_CODES.FIELDS_DONT_MATCH, sameAs(fieldValue)),
  
  // Data
  validDate: () => helpers.withMessage(
    ERROR_CODES.INVALID_DATE,
    (value: string) => {
      if (!value) return false
      const [day, month, year] = value.split('/')
      const date = new Date(Number(year), Number(month) - 1, Number(day))
      return !isNaN(date.getTime())
    }
  ),
}

// Validadores auxiliares
function validarCPF(cpf: string): boolean {
  cpf = cpf.replace(/\D/g, '')
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false
  
  let sum = 0
  let remainder
  
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i)
  }
  
  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cpf.substring(9, 10))) return false
  
  sum = 0
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i)
  }
  
  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cpf.substring(10, 11))) return false
  
  return true
}

function validarCNPJ(cnpj: string): boolean {
  cnpj = cnpj.replace(/\D/g, '')
  if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false
  
  let size = cnpj.length - 2
  let numbers = cnpj.substring(0, size)
  let digits = cnpj.substring(size)
  let sum = 0
  let pos = size - 7
  
  for (let i = size; i >= 1; i--) {
    sum += Number(numbers.charAt(size - i)) * pos--
    if (pos < 2) pos = 9
  }
  
  let result = sum % 11 < 2 ? 0 : 11 - sum % 11
  if (result !== parseInt(digits.charAt(0))) return false
  
  size = size + 1
  numbers = cnpj.substring(0, size)
  sum = 0
  pos = size - 7
  
  for (let i = size; i >= 1; i--) {
    sum += Number(numbers.charAt(size - i)) * pos--
    if (pos < 2) pos = 9
  }
  
  result = sum % 11 < 2 ? 0 : 11 - sum % 11
  if (result !== parseInt(digits.charAt(1))) return false
  
  return true
}
