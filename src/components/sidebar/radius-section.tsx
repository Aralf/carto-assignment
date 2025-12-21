import { use } from 'react'
import { FormControl, InputLabel, Stack, Typography } from '@mui/material'
import type { VectorTileLayerProps } from '@deck.gl/carto'
import { AppDispatchContext } from '@/components/provider.tsx'
import { PixelSizeInput } from '@/components/common/pixel-input.tsx'

export const RadiusSection = ({ state }: { state: VectorTileLayerProps }) => {
  const dispatch = use(AppDispatchContext)
  const radius = state.pointRadiusMinPixels!

  return (
    <Stack spacing={2}>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="space-between"
        sx={{ width: '100%' }}
      >
        <Typography variant="body2">Radius</Typography>
      </Stack>
      <FormControl>
        <InputLabel htmlFor="stroke-size-input">Radius</InputLabel>
        <PixelSizeInput
          id="stroke-size-input"
          value={radius}
          onChange={(newRadiusSize) =>
            dispatch?.({
              type: 'RADIUS_SIZE',
              id: state.id,
              size: newRadiusSize,
            })
          }
        />
      </FormControl>
    </Stack>
  )
}
