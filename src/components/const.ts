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

export const CartoColors = [
  {
    name: 'BurgYl',
    colors: [
      '#fbe6c5',
      '#f5ba98',
      '#ee8a82',
      '#dc7176',
      '#c8586c',
      '#9c3f5d',
      '#70284a',
    ],
  },
  {
    name: 'DarkMint',
    colors: [
      '#d2fbd4',
      '#a5dbc2',
      '#7bbcb0',
      '#559c9e',
      '#3a7c89',
      '#235d72',
      '#123f5a',
    ],
  },
  {
    name: 'Sunset',
    colors: [
      '#f3e79b',
      '#fac484',
      '#f8a07e',
      '#eb7f86',
      '#ce6693',
      '#a059a0',
      '#5c53a5',
    ],
  },
]
