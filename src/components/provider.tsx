import { createContext, useReducer } from 'react'
import type { ActionDispatch, ReactNode } from 'react'
import type { Accessor, Color } from '@deck.gl/core'
import type { Feature, Geometry } from 'geojson'
import type { CustomVectorTileLayerProps } from '@/types.ts'
import { demographicsSource, retailStoresSource } from '@/components/const.ts'

type AppProviderProps = Array<CustomVectorTileLayerProps>

type AppDispatchProps = ActionDispatch<[action: Action]>

export const AppContext = createContext<AppProviderProps | null>(null)

export const AppDispatchContext = createContext<AppDispatchProps | null>(null)

type Action<TFeatureProperties = unknown> =
  | { type: 'TOGGLE_LAYER'; id: string }
  | { type: 'TOGGLE_FILL'; id: string }
  | { type: 'TOGGLE_STROKE'; id: string }
  | { type: 'RADIUS_SIZE'; id: string; size: number }
  | {
      type: 'FILL_COLOR'
      id: string
      getColor:
        | Accessor<Feature<Geometry, TFeatureProperties>, Color>
        | undefined
      field: 'SIMPLE' | (string & {})
      name: string
    }
  | {
      type: 'STROKE_COLOR'
      id: string
      getColor:
        | Accessor<Feature<Geometry, TFeatureProperties>, Color>
        | undefined
    }
  | {
      type: 'STROKE_WIDTH'
      id: string
      width: number
    }

const reducer = (state: Array<CustomVectorTileLayerProps>, action: Action) => {
  switch (action.type) {
    case 'TOGGLE_LAYER': {
      const layerIndex = state.findIndex((layer) => layer.id === action.id)
      return state.with(layerIndex, {
        ...state[layerIndex],
        visible: !state[layerIndex].visible,
      })
    }
    case 'TOGGLE_FILL': {
      const layerIndex = state.findIndex((layer) => layer.id === action.id)
      return state.with(layerIndex, {
        ...state[layerIndex],
        filled: !state[layerIndex].filled,
        getFillColor: state[layerIndex].filled ? undefined : [0, 0, 200, 80],
      })
    }
    case 'TOGGLE_STROKE': {
      const layerIndex = state.findIndex((layer) => layer.id === action.id)
      return state.with(layerIndex, {
        ...state[layerIndex],
        stroked: !state[layerIndex].stroked,
        getLineColor: state[layerIndex].stroked ? undefined : [0, 0, 200],
        lineWidthMinPixels: state[layerIndex].stroked ? undefined : 1,
      })
    }
    case 'RADIUS_SIZE': {
      const layerIndex = state.findIndex((layer) => layer.id === action.id)
      return state.with(layerIndex, {
        ...state[layerIndex],
        pointRadiusMinPixels: action.size,
      })
    }
    case 'FILL_COLOR': {
      const { id, getColor, field, name } = action
      const layerIndex = state.findIndex((layer) => layer.id === id)
      return state.with(layerIndex, {
        ...state[layerIndex],
        getFillColor: getColor,
        config: {
          ...state[layerIndex].config,
          fillColorField: field,
          fillColorName: name,
        },
      })
    }
    case 'STROKE_COLOR': {
      const { id, getColor } = action
      const layerIndex = state.findIndex((layer) => layer.id === id)
      return state.with(layerIndex, {
        ...state[layerIndex],
        getLineColor: getColor,
        config: {
          ...state[layerIndex].config,
        },
      })
    }
    case 'STROKE_WIDTH': {
      const { id, width } = action
      const layerIndex = state.findIndex((layer) => layer.id === id)
      return state.with(layerIndex, {
        ...state[layerIndex],
        lineWidthMinPixels: width,
      })
    }
    default:
      return state
  }
}

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [layersState, dispatch] = useReducer(reducer, [
    {
      id: 'demographics',
      data: demographicsSource,
      getFillColor: [0, 0, 200, 80],
      filled: true,
      getLineColor: [0, 0, 200],
      lineWidthMinPixels: 1,
      stroked: true,
      visible: true,
      config: {
        fillColorField: 'SIMPLE',
        fillColorName: 'BurgYl',
        fillColorNameDefault: 'BurgYl',
        fieldsInfo: [
          { field: 'total_pop', domain: [768, 1008, 1265, 1593, 2126] },
        ],
      },
    },
    {
      id: 'retail-stores',
      data: retailStoresSource,
      pointRadiusMinPixels: 3,
      getFillColor: [200, 0, 80],
      filled: true,
      stroked: false,
      visible: true,
      config: {
        fillColorField: 'SIMPLE',
        fillColorName: 'Sunset',
        fillColorNameDefault: 'Sunset',
        fieldsInfo: [
          {
            field: 'revenue',
            domain: [1148757, 1337864, 1526970, 1716077, 1905183],
          },
        ],
      },
    },
  ])

  return (
    <AppContext value={layersState}>
      <AppDispatchContext value={dispatch}>{children}</AppDispatchContext>
    </AppContext>
  )
}
