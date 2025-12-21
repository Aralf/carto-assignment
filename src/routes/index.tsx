import { createFileRoute } from '@tanstack/react-router'
import { Box } from '@mui/material'
import Map from '@/components/map'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '320px minmax(0, 1fr)',
        height: '100dvh',
      }}
    >
      <div></div>
      <Box sx={{ position: 'relative' }}>
        <Map />
      </Box>
    </Box>
  )
}
