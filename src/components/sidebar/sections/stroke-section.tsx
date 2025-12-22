import { Stack, Typography } from '@mui/material'
import type { CustomVectorTileLayerProps } from '@/types.ts'
import { ToggleSectionButton } from '@/components/sidebar/toggle-section-button.tsx'
import { StrokeColorControl } from '@/components/common/controls/stroke-color-control.tsx'
import { StrokeWeightControl } from '@/components/common/controls/stroke-weight-control.tsx'

export const StrokeSection = ({
  state,
}: {
  state: CustomVectorTileLayerProps
}) => {
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
        <ToggleSectionButton state={state} section="stroke" />
      </Stack>
      {state.stroked ? (
        <>
          <StrokeColorControl state={state} />
          <StrokeWeightControl state={state} />
        </>
      ) : null}
    </Stack>
  )
}
