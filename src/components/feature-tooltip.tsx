import { Popup } from 'react-map-gl/maplibre'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material'
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
        <TableContainer sx={{ backgroundColor: 'default.light' }}>
          <Table size="small">
            <TableBody>
              {Object.entries(info.object.properties).map(([key, value]) => (
                <TableRow key={key}>
                  <TableCell>{key}</TableCell>
                  <TableCell>{value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Popup>
  )
}
