export function hexToRgb(
  hex: string,
): [number, number, number] | [number, number, number, number] {
  let cleanHex = hex.replace(/^#/, '')

  // Expand shorthand (e.g., "abc" -> "aabbcc", "abcd" -> "aabbccdd")
  if (cleanHex.length === 3 || cleanHex.length === 4) {
    cleanHex = cleanHex
      .split('')
      .map((c) => c + c)
      .join('')
  }

  const r = parseInt(cleanHex.slice(0, 2), 16)
  const g = parseInt(cleanHex.slice(2, 4), 16)
  const b = parseInt(cleanHex.slice(4, 6), 16)

  if (cleanHex.length === 8) {
    const a = parseInt(cleanHex.slice(6, 8), 16)
    return [r, g, b, a]
  }

  return [r, g, b]
}

export function rgbToHex(
  rgb: [number, number, number] | [number, number, number, number],
): string {
  const [r, g, b, a] = rgb

  const hex =
    '#' +
    [r, g, b].map((c) => Math.round(c).toString(16).padStart(2, '0')).join('')

  if (a !== undefined) {
    return hex + Math.round(a).toString(16).padStart(2, '0')
  }

  return hex
}
