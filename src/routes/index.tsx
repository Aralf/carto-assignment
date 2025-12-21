import { createFileRoute } from '@tanstack/react-router'
import Map from '@/components/map'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div>
      <Map />
    </div>
  )
}
