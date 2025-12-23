import { use, useDeferredValue, useState } from 'react'
import { BASEMAP, VectorTileLayer } from '@deck.gl/carto'
import { MapboxOverlay } from '@deck.gl/mapbox'
import { Map as Maplibre, useControl } from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'
import type { DeckProps, MapViewState, PickingInfo } from '@deck.gl/core'
import type { Feature } from 'geojson'
import { AppContext } from '@/components/provider.tsx'
import { FeatureTooltip } from '@/components/feature-tooltip.tsx'

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
  const [featureInfo, setFeatureInfo] = useState<PickingInfo<Feature> | null>(
    null,
  )
  const [cursor, setCursor] = useState<'grab' | 'pointer'>('grab')

  const layers =
    deferredLayersState?.map((layerState) => new VectorTileLayer(layerState)) ??
    []

  return (
    <Maplibre
      initialViewState={INITIAL_VIEW_STATE}
      mapStyle={BASEMAP.VOYAGER}
      cursor={cursor}
    >
      <DeckGLOverlay
        controller
        layers={layers}
        onClick={(info) => setFeatureInfo(info.index === -1 ? null : info)}
        onHover={(info) => {
          setCursor(info.index === -1 ? 'grab' : 'pointer')
        }}
      />
      <FeatureTooltip info={featureInfo} onClose={() => setFeatureInfo(null)} />
    </Maplibre>
  )
}
