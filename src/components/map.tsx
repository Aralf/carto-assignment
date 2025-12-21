import { use } from 'react'
import { DeckGL } from '@deck.gl/react'
import { BASEMAP, VectorTileLayer } from '@deck.gl/carto'
import Maplibre from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'
import type { ReactNode } from 'react'
import type { MapViewState } from '@deck.gl/core'
import { AppContext } from '@/components/provider.tsx'

const INITIAL_VIEW_STATE: MapViewState = {
  latitude: 39.8097343,
  longitude: -98.5556199,
  zoom: 4,
  bearing: 0,
  pitch: 30,
}

export default function Map({ children }: { children?: ReactNode }) {
  const layersState = use(AppContext)

  const layers =
    layersState?.map((layerState) => new VectorTileLayer(layerState)) ?? []

  return (
    <DeckGL initialViewState={INITIAL_VIEW_STATE} controller layers={layers}>
      <Maplibre mapStyle={BASEMAP.VOYAGER}>{children}</Maplibre>
    </DeckGL>
  )
}
