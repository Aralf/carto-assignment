import { Stack, Typography } from '@mui/material'
import type { CustomVectorTileLayerProps } from '@/types.ts'
import { ToggleSection } from '@/components/sidebar/toggle-section.tsx'
import { ColorControl } from '@/components/common/color-control.tsx'
import { StrokeWeightControl } from '@/components/common/stroke-weight-control.tsx'

export const StrokeSection = ({
  state,
  dataFields,
}: {
  state: CustomVectorTileLayerProps
  dataFields: Record<string, string>
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
        <ToggleSection state={state} section="stroke" />
      </Stack>
      {state.stroked ? (
        <>
          <ColorControl field="stroke" state={state} dataFields={dataFields} />
          <StrokeWeightControl state={state} />
        </>
      ) : null}
    </Stack>
  )
}
