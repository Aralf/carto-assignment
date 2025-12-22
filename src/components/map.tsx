import { use, useDeferredValue } from 'react'
import { BASEMAP, VectorTileLayer } from '@deck.gl/carto'
import { MapboxOverlay } from '@deck.gl/mapbox'
import { Map as Maplibre, useControl } from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'
import type { DeckProps, MapViewState } from '@deck.gl/core'
import { AppContext } from '@/components/provider.tsx'

const INITIAL_VIEW_STATE: MapViewState = {
  latitude: 39.8097343,
  longitude: -98.5556199,
  zoom: 4,
  bearing: 0,
  pitch: 30,
}

function DeckGLOverlay(props: DeckProps) {
  const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props))
  overlay.setProps(props)
  return null
}

export default function Map() {
  const layersState = use(AppContext)
  const deferredLayersState = useDeferredValue(layersState)

  const layers =
    deferredLayersState?.map((layerState) => new VectorTileLayer(layerState)) ??
    []

  return (
    <Maplibre initialViewState={INITIAL_VIEW_STATE} mapStyle={BASEMAP.VOYAGER}>
      <DeckGLOverlay controller layers={layers} />
    </Maplibre>
  )
}
