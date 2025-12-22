import { Stack, Typography } from '@mui/material'
import type { CustomVectorTileLayerProps } from '@/types.ts'
import { ToggleSection } from '@/components/sidebar/toggle-section.tsx'
import { ColorControl } from '@/components/common/color-control.tsx'

export const FillSection = ({
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
        <Typography variant="body2">Fill</Typography>
        <ToggleSection state={state} section="fill" />
      </Stack>
      {state.filled ? (
        <ColorControl field="fill" state={state} dataFields={dataFields} />
      ) : null}
    </Stack>
  )
}
