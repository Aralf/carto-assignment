import { use, useDeferredValue } from 'react'
import { Stack } from '@mui/material'
import { AppContext } from '@/components/provider.tsx'
import { StoreRevenueWidget } from '@/components/widgets/store-revenue-widget.tsx'
import { WidgetCard } from '@/components/widgets/widget-card.tsx'

export const WidgetPanel = () => {
  const layersState = use(AppContext)
  const deferredLayersState = useDeferredValue(layersState)

  const retailStoresLayerProps = deferredLayersState?.find(
    (layerState) => layerState.id === 'retail-stores',
  )

  if (!retailStoresLayerProps?.visible) return null

  return (
    <Stack
      sx={{
        position: 'absolute',
        insetInlineEnd: 16,
        insetBlockStart: 16,
        zIndex: 10,
        gap: 2,
        width: 365,
      }}
    >
      <WidgetCard title="Revenue per Store type">
        <StoreRevenueWidget />
      </WidgetCard>
    </Stack>
  )
}
