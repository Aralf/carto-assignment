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
import { PixelSizeInput } from '@/components/common/pixel-input.tsx'

export const StrokeSection = ({ state }: { state: VectorTileLayerProps }) => {
  const dispatch = use(AppDispatchContext)
  const rgbColor = state.getLineColor as RgbColor | undefined
  const lineWidth = state.lineWidthMinPixels

  return (
    <Stack spacing={2}>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="space-between"
        sx={{ width: '100%' }}
      >
        <Typography variant="body2">Stroke</Typography>
        <Tooltip title={state.stroked ? 'Remove stroke' : 'Add stroke'}>
          <IconButton
            onClick={() => dispatch?.({ type: 'TOGGLE_STROKE', id: state.id })}
          >
            {state.stroked ? <RemoveOutlined /> : <AddOutlined />}
          </IconButton>
        </Tooltip>
      </Stack>
      {state.stroked && rgbColor !== undefined ? (
        <FormControl>
          <InputLabel htmlFor="stroke-color-input">Color</InputLabel>
          <ColorInput
            id="stroke-color-input"
            value={rgbColor}
            onChange={(newRgbColor) =>
              dispatch?.({
                type: 'STROKE_COLOR',
                id: state.id,
                color: newRgbColor,
              })
            }
          />
        </FormControl>
      ) : null}
      {state.stroked && lineWidth !== undefined ? (
        <FormControl>
          <InputLabel htmlFor="stroke-size-input">Stroke weight</InputLabel>
          <PixelSizeInput
            id="stroke-size-input"
            value={lineWidth}
            onChange={(newLineWidth) =>
              dispatch?.({
                type: 'STROKE_WIDTH',
                id: state.id,
                width: newLineWidth,
              })
            }
          />
        </FormControl>
      ) : null}
    </Stack>
  )
}
