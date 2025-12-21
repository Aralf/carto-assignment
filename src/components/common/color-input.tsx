import { startTransition, useOptimistic } from 'react'
import { Box, InputAdornment, TextField } from '@mui/material'
import type { ChangeEvent } from 'react'
import type { RgbColor } from '@/types'
import { hexToRgb, rgbToHex } from '@/utils/colors.ts'

export const ColorInput = ({
  value,
  onChange,
  id,
}: {
  value: RgbColor
  onChange?: (newColor: RgbColor) => void
  id?: string
}) => {
  const [color, setOptimisticColor] = useOptimistic(value)
  const [r, g, b, a = 100] = color
  const hexColor = rgbToHex([r, g, b])

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newHexColor = e.target.value
    const newRgbColor = [...hexToRgb(newHexColor), a] as RgbColor
    startTransition(() => {
      setOptimisticColor(newRgbColor)
      onChange?.(newRgbColor)
    })
  }

  const handleAlphaChange = (e: ChangeEvent<HTMLInputElement>) => {
    let newAlpha = e.target.valueAsNumber
    if (isNaN(newAlpha)) return
    if (newAlpha > 100) newAlpha = 100
    if (newAlpha < 0) newAlpha = 0
    const newRgbColor = [r, g, b, newAlpha] as RgbColor
    startTransition(() => {
      setOptimisticColor(newRgbColor)
      onChange?.(newRgbColor)
    })
  }

  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      <TextField
        id={id}
        sx={{ flex: '60% 1 0' }}
        type="color"
        value={hexColor}
        onChange={handleColorChange}
      />
      <TextField
        type="number"
        value={a}
        onChange={handleAlphaChange}
        slotProps={{
          htmlInput: { min: 0, max: 100 },
          input: {
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          },
        }}
      />
    </Box>
  )
}
