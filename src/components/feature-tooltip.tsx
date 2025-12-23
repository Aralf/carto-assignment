import { Popup } from 'react-map-gl/maplibre'
import type { PickingInfo } from '@deck.gl/core'
import type { Feature } from 'geojson'

export const FeatureTooltip = ({
  info,
  onClose,
}: {
  info: PickingInfo<Feature> | null
  onClose: () => void
}) => {
  if (!info) return null

  return (
    <Popup
      style={{ zIndex: 10 }}
      longitude={Number(info.coordinate![0])}
      latitude={Number(info.coordinate![1])}
      onClose={onClose}
    >
      {info.object?.properties && (
        <div>
          {Object.entries(info.object.properties).map(([key, value]) => (
            <div key={key}>{`${key}: ${value}`}</div>
          ))}
        </div>
      )}
    </Popup>
  )
}
