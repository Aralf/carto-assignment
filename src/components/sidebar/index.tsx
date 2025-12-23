import { use } from 'react'
import { Box } from '@mui/material'
import { AppContext } from '@/components/provider.tsx'
import { LayerItemWrapper } from '@/components/sidebar/layer-item.tsx'

export const Sidebar = () => {
  const layersState = use(AppContext)
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        margin: 1,
        overflowY: 'auto',
      }}
    >
      {layersState?.map((layer) => (
        <LayerItemWrapper key={layer.id} state={layer} />
      )) ?? []}
    </Box>
  )
}
