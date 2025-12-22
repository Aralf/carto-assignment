import { IconButton, Tooltip } from '@mui/material'
import { AddOutlined, RemoveOutlined } from '@mui/icons-material'
import { use } from 'react'
import type { CustomVectorTileLayerProps } from '@/types.ts'
import { AppDispatchContext } from '@/components/provider.tsx'

export const ToggleSection = ({
  state,
  section,
}: {
  state: CustomVectorTileLayerProps
  section: 'fill' | 'stroke'
}) => {
  const dispatch = use(AppDispatchContext)
  const stateValue = section === 'fill' ? state.filled : state.stroked

  return (
    <Tooltip title={stateValue ? `Remove ${section}` : 'Add ${section}'}>
      <IconButton
        onClick={() =>
          dispatch?.({
            type: `TOGGLE_${section.toUpperCase()}` as
              | 'TOGGLE_FILL'
              | 'TOGGLE_STROKE',
            id: state.id,
          })
        }
      >
        {stateValue ? <RemoveOutlined /> : <AddOutlined />}
      </IconButton>
    </Tooltip>
  )
}
