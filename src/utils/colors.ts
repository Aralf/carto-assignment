/**
 * Converts a hexadecimal color code to an RGB or RGBA color tuple.
 *
 * @param hex The hexadecimal color string, starting with or without a "#" symbol.
 *            It can be in the shorthand (e.g., "#abc" or "#abcd") or full (e.g.,
 *            "#aabbcc" or "#aabbccdd") format.
 * @return An array representing the RGB or RGBA color. Returns [r, g, b] for standard
 *         RGB colors or [r, g, b, a] if an alpha value is provided in the hexadecimal input.
 */
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

/**
 * Converts an RGB or RGBA color value to its corresponding hexadecimal string representation.
 *
 * @param {([number, number, number] | [number, number, number, number])} rgb - An array representing the RGB or RGBA color values. The first three numbers represent the red, green, and blue channels (0-255), and the optional fourth number represents the alpha channel (0-255).
 * @return {string} The hexadecimal color string, starting with `#`. For RGB, the output is a 6-character string. For RGBA, it is an 8-character string.
 */
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
