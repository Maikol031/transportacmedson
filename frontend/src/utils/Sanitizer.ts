// utils/Sanitizer.ts
import DOMPurify from 'dompurify'

/**
 * Sanitizer utilitário para sanitização de objetos enviados para APIs.
 * Utiliza DOMPurify para máxima segurança em strings.
 */
export class Sanitizer {
  /**
   * Sanitiza uma string usando DOMPurify (remove qualquer código de HTML/script).
   */
  static sanitizeString(str: string): string {
    if (typeof str !== 'string') return ''
    // Remove qualquer tag HTML, JS, eventos ou atributos indesejados
    return DOMPurify.sanitize(str, {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [],
    }).trim()
  }

  /**
   * Sanitiza todos os campos string de um objeto (e objetos aninhados), usando DOMPurify.
   * Permite regras específicas por campo, se necessário.
   * Exemplo de uso:
   *   Sanitizer.sanitizeObject(obj, { email: Sanitizer.sanitizeEmail })
   */
  static sanitizeObject<T extends Record<string, any>>(
    obj: T,
    fieldRules?: Record<string, (value: any) => any>
  ): T {
    if (!obj || typeof obj !== 'object') return obj

    const sanitized: any = Array.isArray(obj) ? [] : {}

    for (const key in obj) {
      const value = obj[key]

      if (fieldRules && fieldRules[key]) {
        sanitized[key] = fieldRules[key](value)
      } else if (typeof value === 'string') {
        sanitized[key] = this.sanitizeString(value)
      } else if (typeof value === 'object' && value !== null) {
        sanitized[key] = this.sanitizeObject(value, fieldRules)
      } else {
        sanitized[key] = value
      }
    }

    return sanitized
  }

  /**
   * Exemplo de sanitização para e-mails: remove espaços, força minúsculas, valida padrão.
   */
  static sanitizeEmail(email: string): string | null {
    if (typeof email !== 'string') return null
    const trimmed = email.trim().toLowerCase()
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(trimmed) ? trimmed : null
  }

  /**
   * Exemplo de sanitização para datas (DD/MM/YYYY ou YYYY-MM-DD)
   */
  static sanitizeDate(date: string): string | null {
    if (typeof date !== 'string') return null
    date = date.trim()
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(date)) {
      const [d, m, y] = date.split('/')
      const parsed = new Date(Number(y), Number(m) - 1, Number(d))
      return isNaN(parsed.getTime()) ? null : date
    }
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      const parsed = new Date(date)
      return isNaN(parsed.getTime()) ? null : date
    }
    return null
  }
}
