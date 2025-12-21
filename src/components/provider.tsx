import { createContext, useReducer } from 'react'
import type { ActionDispatch, ReactNode } from 'react'
import type { VectorTileLayerProps } from '@deck.gl/carto'
import { demographicsSource, retailStoresSource } from '@/components/const.ts'

type AppProviderProps = Array<VectorTileLayerProps>

type AppDispatchProps = ActionDispatch<[action: Action]>

export const AppContext = createContext<AppProviderProps | null>(null)

export const AppDispatchContext = createContext<AppDispatchProps | null>(null)

type Action =
  | {
      type: 'TOGGLE_LAYER'
      id: string
    }
  | { type: 'FILL_COLOR'; id: string }

const reducer = (state: Array<VectorTileLayerProps>, action: Action) => {
  switch (action.type) {
    case 'TOGGLE_LAYER': {
      const layerIndex = state.findIndex((layer) => layer.id === action.id)
      return state.with(layerIndex, {
        ...state[layerIndex],
        visible: !state[layerIndex].visible,
      })
    }
    default:
      return state
  }
}

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [layersState, dispatch] = useReducer(reducer, [
    {
      id: 'retail-stores',
      data: retailStoresSource,
      pointRadiusMinPixels: 3,
      getFillColor: [200, 0, 80],
      visible: true,
    },
    {
      id: 'demographics',
      data: demographicsSource,
      getFillColor: [0, 0, 200, 80],
      getLineColor: [0, 0, 200],
      lineWidthMinPixels: 1,
      visible: true,
    },
  ])

  return (
    <AppContext value={layersState}>
      <AppDispatchContext value={dispatch}>{children}</AppDispatchContext>
    </AppContext>
  )
}
