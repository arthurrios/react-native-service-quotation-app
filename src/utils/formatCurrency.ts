/**
 * Formats a number as Brazilian Real (BRL) currency
 * @param value - The numeric value to format
 * @returns Formatted currency string (e.g., "R$ 1.234,56")
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}
