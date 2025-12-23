import { describe, expect, it } from 'vitest'
import { hexToRgb } from './colors'

describe('hexToRgb', () => {
  it('should convert a 6-character hexadecimal color to an RGB array', () => {
    expect(hexToRgb('#aabbcc')).toEqual([170, 187, 204])
  })

  it('should convert a 3-character shorthand hexadecimal color to an RGB array', () => {
    expect(hexToRgb('#abc')).toEqual([170, 187, 204])
  })

  it('should convert an 8-character hexadecimal color to an RGBA array', () => {
    expect(hexToRgb('#aabbccdd')).toEqual([170, 187, 204, 221])
  })

  it('should convert a 4-character shorthand hexadecimal color to an RGBA array', () => {
    expect(hexToRgb('#abcd')).toEqual([170, 187, 204, 221])
  })

  it('should handle hexadecimal colors without a "#" prefix', () => {
    expect(hexToRgb('aabbcc')).toEqual([170, 187, 204])
    expect(hexToRgb('abcd')).toEqual([170, 187, 204, 221])
  })

  it('should handle edge cases like pure black (#000 or #000000)', () => {
    expect(hexToRgb('#000')).toEqual([0, 0, 0])
    expect(hexToRgb('#000000')).toEqual([0, 0, 0])
  })

  it('should return NaN values for invalid hex strings', () => {
    expect(hexToRgb('')).toEqual([NaN, NaN, NaN])
    expect(hexToRgb('#zzzzzz')).toEqual([NaN, NaN, NaN])
  })
})
