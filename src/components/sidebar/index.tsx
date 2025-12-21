import { use } from 'react'
import { AppContext } from '@/components/provider.tsx'
import { LayerItem } from '@/components/sidebar/layer-item.tsx'

export const Sidebar = () => {
  const layersState = use(AppContext)
  return (
    layersState?.map((layer) => <LayerItem key={layer.id} state={layer} />) ??
    []
  )
}
