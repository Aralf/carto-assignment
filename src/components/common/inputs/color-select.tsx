import { startTransition, useOptimistic } from 'react'
import { Box, MenuItem, TextField } from '@mui/material'
import type { ChangeEvent } from 'react'
import { CartoColors } from '@/components/const.ts'

export const ColorSelect = ({
  value,
  onChange,
}: {
  value: string
  onChange?: (newColor: string) => void
}) => {
  const [optimisticName, setOptimisticName] = useOptimistic(value)

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value
    startTransition(() => {
      setOptimisticName(newColor)
      onChange?.(newColor)
    })
  }

  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      <TextField
        fullWidth
        value={optimisticName}
        onChange={handleNameChange}
        select
      >
        {CartoColors.map((option) => (
          <MenuItem key={option.name} value={option.name}>
            <Box sx={{ display: 'flex', flex: '1 1 0%' }}>
              {option.colors.map((color) => (
                <Box
                  key={color}
                  sx={{ backgroundColor: color, height: 16, flex: '1 1 0%' }}
                />
              ))}
            </Box>
          </MenuItem>
        ))}
      </TextField>
    </Box>
  )
}
