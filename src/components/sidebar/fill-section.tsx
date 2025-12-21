import { use } from 'react'
import {
  FormControl,
  IconButton,
  InputLabel,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import { AddOutlined, RemoveOutlined } from '@mui/icons-material'
import type { VectorTileLayerProps } from '@deck.gl/carto'
import type { RgbColor } from '@/types.ts'
import { AppDispatchContext } from '@/components/provider.tsx'
import { ColorInput } from '@/components/common/color-input.tsx'

export const FillSection = ({ state }: { state: VectorTileLayerProps }) => {
  const dispatch = use(AppDispatchContext)
  const rgbColor = state.getFillColor as RgbColor | undefined

  return (
    <Stack spacing={2}>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="space-between"
        sx={{ width: '100%' }}
      >
        <Typography variant="body2">Fill</Typography>
        <Tooltip title={state.filled ? 'Remove fill' : 'Add fill'}>
          <IconButton
            onClick={() => dispatch?.({ type: 'TOGGLE_FILL', id: state.id })}
          >
            {state.filled ? <RemoveOutlined /> : <AddOutlined />}
          </IconButton>
        </Tooltip>
      </Stack>
      {state.filled && rgbColor !== undefined ? (
        <FormControl>
          <InputLabel htmlFor="fill-color-input">Color</InputLabel>
          <ColorInput
            id="fill-color-input"
            value={rgbColor}
            onChange={(newRgbColor) =>
              dispatch?.({
                type: 'FILL_COLOR',
                id: state.id,
                color: newRgbColor,
              })
            }
          />
        </FormControl>
      ) : null}
    </Stack>
  )
}
