import { Stack, Typography } from '@mui/material'
import type { CustomVectorTileLayerProps } from '@/types.ts'
import { ToggleSectionButton } from '@/components/sidebar/toggle-section-button.tsx'
import { FillColorControl } from '@/components/common/controls/fill-color-control.tsx'

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
        <ToggleSectionButton state={state} section="fill" />
      </Stack>
      {state.filled ? (
        <FillColorControl state={state} dataFields={dataFields} />
      ) : null}
    </Stack>
  )
}
