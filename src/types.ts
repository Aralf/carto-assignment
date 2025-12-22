import type { VectorTileLayerProps } from '@deck.gl/carto'

export type FieldConfig = {
  fillColorField: 'SIMPLE' | (string & {})
  // strokeColorField: 'SIMPLE' | (string & {})
  fillColorName: string
  // strokeColorName: string
  fillColorNameDefault: string
  // strokeColorNameDefault: string
  // To simplify
  fieldsInfo: Array<{ field: string; domain: Array<number> }>
}
export type CustomVectorTileLayerProps = VectorTileLayerProps & {
  config: FieldConfig
}
