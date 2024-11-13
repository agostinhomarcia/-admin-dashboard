/**
 * Verifica se um email é válido
 * @param email Email a ser validado
 * @returns true se o email for válido, false caso contrário
 * @example
 * isValidEmail("usuario@exemplo.com") // true
 * isValidEmail("email-invalido") // false
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
