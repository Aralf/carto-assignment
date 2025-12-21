import { DeckGL } from '@deck.gl/react'
import {
  BASEMAP,
  VectorTileLayer,
  vectorTableSource,
  vectorTilesetSource,
} from '@deck.gl/carto'
import Maplibre from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'
import type { ReactNode } from 'react'
import type { MapViewState } from '@deck.gl/core'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
const accessToken = import.meta.env.VITE_API_ACCESS_TOKEN
const connectionName = 'carto_dw'
const cartoConfig = { apiBaseUrl, accessToken, connectionName }

const INITIAL_VIEW_STATE: MapViewState = {
  latitude: 39.8097343,
  longitude: -98.5556199,
  zoom: 4,
  bearing: 0,
  pitch: 30,
}

const retailStoresSource = vectorTableSource({
  ...cartoConfig,
  tableName: 'carto-demo-data.demo_tables.retail_stores',
})

const RetailStoresLayer = new VectorTileLayer({
  id: 'retail-stores',
  data: retailStoresSource,
  pointRadiusMinPixels: 3,
  getFillColor: [200, 0, 80],
})

const demographicsSource = vectorTilesetSource({
  ...cartoConfig,
  tableName: 'carto-demo-data.demo_tilesets.sociodemographics_usa_blockgroup',
})

const DemographicsLayer = new VectorTileLayer({
  id: 'demographics',
  data: demographicsSource,
  // pointType: 'polygon',
  getFillColor: [0, 0, 200, 80],
  getLineColor: [0, 0, 200],
  lineWidthMinPixels: 1,
})

export default function Map({ children }: { children?: ReactNode }) {
  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller
      layers={[RetailStoresLayer, DemographicsLayer]}
    >
      <Maplibre mapStyle={BASEMAP.VOYAGER}>{children}</Maplibre>
    </DeckGL>
  )
}
