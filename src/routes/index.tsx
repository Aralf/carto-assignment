import { createFileRoute } from '@tanstack/react-router'
import { Box } from '@mui/material'
import Map from '@/components/map'
import { AppProvider } from '@/components/provider.tsx'
import { Sidebar } from '@/components/sidebar'
import { WidgetPanel } from '@/components/widgets/widget-panel.tsx'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <AppProvider>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '320px minmax(0, 1fr)',
          gridTemplateRows: 'minmax(0, 1fr)',
          height: '100dvh',
        }}
      >
        <Sidebar />
        <Box sx={{ position: 'relative' }}>
          <Map />
          <WidgetPanel />
        </Box>
      </Box>
    </AppProvider>
  )
}
