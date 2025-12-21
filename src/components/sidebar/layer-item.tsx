import { Card } from '@mui/material'
import type { VectorTileLayerProps } from '@deck.gl/carto'
import { ToggleVisibilityButton } from '@/components/sidebar/toggle-visibility-button.tsx'

export const LayerItem = ({ state }: { state: VectorTileLayerProps }) => {
  return (
    <Card variant="outlined">
      {state.id}
      <ToggleVisibilityButton state={state} />
    </Card>
  )
}
