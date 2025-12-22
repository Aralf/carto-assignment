import { startTransition, useOptimistic } from 'react'
import { Box, InputAdornment, Slider, TextField } from '@mui/material'
import type { ChangeEvent } from 'react'
import type { SliderOwnProps } from '@mui/material'

export const PixelSizeInput = ({
  value,
  onChange,
  id,
}: {
  value: number
  onChange?: (newValue: number) => void
  id?: string
}) => {
  const [optimisticPixelSize, setOptimisticPixelSize] = useOptimistic(value)

  const handleSliderChange: SliderOwnProps<number>['onChange'] = (
    _,
    newValue,
  ) => {
    startTransition(() => {
      setOptimisticPixelSize(newValue)
      onChange?.(newValue)
    })
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.valueAsNumber
    if (isNaN(newValue)) return
    if (newValue > 100) newValue = 100
    if (newValue < 0) newValue = 0
    startTransition(() => {
      setOptimisticPixelSize(newValue)
      onChange?.(newValue)
    })
  }

  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      <Slider
        id={id}
        sx={{ flex: '60% 1 0' }}
        value={optimisticPixelSize}
        onChange={handleSliderChange}
      />
      <TextField
        type="number"
        value={optimisticPixelSize}
        onChange={handleInputChange}
        slotProps={{
          htmlInput: { min: 0, max: 100 },
          input: {
            endAdornment: <InputAdornment position="end">px</InputAdornment>,
          },
        }}
      />
    </Box>
  )
}
