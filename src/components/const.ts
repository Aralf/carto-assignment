import { vectorTableSource, vectorTilesetSource } from '@deck.gl/carto'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
const accessToken = import.meta.env.VITE_API_ACCESS_TOKEN
const connectionName = 'carto_dw'
const cartoConfig = { apiBaseUrl, accessToken, connectionName }

export const retailStoresSource = vectorTableSource({
  ...cartoConfig,
  tableName: 'carto-demo-data.demo_tables.retail_stores',
  spatialDataColumn: 'geom',
  spatialDataType: 'geo',
})

export const demographicsSource = vectorTilesetSource({
  ...cartoConfig,
  tableName: 'carto-demo-data.demo_tilesets.sociodemographics_usa_blockgroup',
})
