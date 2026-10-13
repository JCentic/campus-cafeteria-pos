const pesoFormatter = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
  minimumFractionDigits: 2,
})

// Turns centavos (1500) into a peso label ("₱15.00").
export function formatPeso(centavos) {
  return pesoFormatter.format(centavos / 100)
}
