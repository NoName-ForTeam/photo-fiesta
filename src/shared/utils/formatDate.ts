export function formatDateTo(isoString: string) {
  const date = new Date(isoString)

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // Месяцы начинаются с 0, поэтому добавляем 1
  const year = date.getFullYear()

  return `${day}.${month}.${year}`
}
