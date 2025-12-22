import { startTransition, useOptimistic } from 'react'
import { Box, MenuItem, TextField } from '@mui/material'
import type { ChangeEvent } from 'react'

const colorOptions = [
  {
    name: 'BurgYl',
    colors: [
      '#fbe6c5',
      '#f5ba98',
      '#ee8a82',
      '#dc7176',
      '#c8586c',
      '#9c3f5d',
      '#70284a',
    ],
  },
  {
    name: 'DarkMint',
    colors: [
      '#d2fbd4',
      '#a5dbc2',
      '#7bbcb0',
      '#559c9e',
      '#3a7c89',
      '#235d72',
      '#123f5a',
    ],
  },
  {
    name: 'Sunset',
    colors: [
      '#f3e79b',
      '#fac484',
      '#f8a07e',
      '#eb7f86',
      '#ce6693',
      '#a059a0',
      '#5c53a5',
    ],
  },
]

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
        {colorOptions.map((option) => (
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
