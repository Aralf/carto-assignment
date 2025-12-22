import { use } from 'react'
import { FormControl, InputLabel } from '@mui/material'
import type { CustomVectorTileLayerProps } from '@/types.ts'
import { PixelSizeInput } from '@/components/common/pixel-input.tsx'
import { AppDispatchContext } from '@/components/provider.tsx'

export const StrokeWeightControl = ({
  state,
}: {
  state: CustomVectorTileLayerProps
}) => {
  const dispatch = use(AppDispatchContext)
  return (
    <>
      <FormControl>
        <InputLabel htmlFor="stroke-size-input">Stroke weight</InputLabel>
        <PixelSizeInput
          id="stroke-size-input"
          value={state.lineWidthMinPixels ?? 0}
          onChange={(newLineWidth) =>
            dispatch?.({
              type: 'STROKE_WIDTH',
              id: state.id,
              width: newLineWidth,
            })
          }
        />
      </FormControl>
    </>
  )
}
