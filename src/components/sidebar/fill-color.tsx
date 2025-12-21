import { use } from 'react'
import { FormControl, InputLabel } from '@mui/material'
import type { VectorTileLayerProps } from '@deck.gl/carto'
import type { RgbColor } from '@/types.ts'
import { AppDispatchContext } from '@/components/provider.tsx'
import { ColorInput } from '@/components/common/color-input.tsx'

export const FillColor = ({ state }: { state: VectorTileLayerProps }) => {
  const dispatch = use(AppDispatchContext)
  const rgbColor = state.getFillColor as RgbColor

  return (
    <FormControl>
      <InputLabel htmlFor="fill-color-input">Fill color</InputLabel>
      <ColorInput
        id="fill-color-input"
        value={rgbColor}
        onChange={(newRgbColor) =>
          dispatch?.({ type: 'FILL_COLOR', id: state.id, color: newRgbColor })
        }
      />
    </FormControl>
  )
}
