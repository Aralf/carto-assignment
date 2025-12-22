import { use } from 'react'
import { FormControl, InputLabel } from '@mui/material'
import type { CustomVectorTileLayerProps } from '@/types.ts'
import type { Color } from '@deck.gl/core'
import { AppDispatchContext } from '@/components/provider.tsx'
import { ColorInput } from '@/components/common/color-input.tsx'

export const StrokeColorControl = ({
  state,
}: {
  state: CustomVectorTileLayerProps
}) => {
  const dispatch = use(AppDispatchContext)
  return (
    <>
      <FormControl>
        <InputLabel htmlFor="stroke-color-input">Color</InputLabel>
        <ColorInput
          id="stroke-color-input"
          value={state.getLineColor as Color}
          onChange={(newRgbColor) =>
            dispatch?.({
              type: 'STROKE_COLOR',
              id: state.id,
              getColor: newRgbColor,
            })
          }
        />
      </FormControl>
    </>
  )
}
