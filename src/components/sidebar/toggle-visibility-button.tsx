import { use } from 'react'
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import type { VectorTileLayerProps } from '@deck.gl/carto'
import { AppDispatchContext } from '@/components/provider.tsx'

export const ToggleVisibilityButton = ({
  state,
}: {
  state: VectorTileLayerProps
}) => {
  const dispatch = use(AppDispatchContext)

  const handleToggleVisibility = () => {
    dispatch?.({ type: 'TOGGLE_LAYER', id: state.id })
  }

  return (
    <IconButton onClick={handleToggleVisibility}>
      {state.visible ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
    </IconButton>
  )
}
