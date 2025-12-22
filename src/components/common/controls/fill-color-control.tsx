import { use } from 'react'
import {
  Chip,
  Divider,
  FormControl,
  InputLabel,
  ListItemText,
  ListSubheader,
  MenuItem,
  Select,
} from '@mui/material'
import { colorBins } from '@deck.gl/carto'
import type { Color } from '@deck.gl/core'
import type { CustomVectorTileLayerProps } from '@/types.ts'
import { ColorInput } from '@/components/common/inputs/color-input.tsx'
import { ColorSelect } from '@/components/common/inputs/color-select.tsx'
import { AppDispatchContext } from '@/components/provider.tsx'

export const FillColorControl = ({
  state,
  dataFields,
}: {
  state: CustomVectorTileLayerProps
  dataFields: Record<string, string>
}) => {
  const dispatch = use(AppDispatchContext)

  return (
    <>
      <FormControl>
        <InputLabel htmlFor="fill-color-select">Color</InputLabel>
        <Select
          id="fill-color-select"
          value={state.config.fillColorField}
          onChange={(e) => {
            const newValue = e.target.value
            dispatch?.({
              type: 'FILL_COLOR',
              id: state.id,
              getColor:
                newValue === 'SIMPLE'
                  ? [0, 0, 200]
                  : colorBins({
                      attr: newValue,
                      domain: state.config.fieldsInfo.find(
                        (f) => f.field === newValue,
                      )?.domain ?? [0, 1000],
                      colors: state.config.fillColorNameDefault,
                    }),
              field: newValue,
              name: state.config.fillColorName,
            })
          }}
          renderValue={(value) =>
            value === 'SIMPLE' ? 'Simple' : `by ${value}`
          }
        >
          <MenuItem value="SIMPLE">Simple</MenuItem>
          <Divider />
          <ListSubheader sx={{ fontSize: '0.875rem' }}>Fields</ListSubheader>
          {Object.entries(dataFields)
            .filter(([field1]) =>
              state.config.fieldsInfo.map((f) => f.field).includes(field1),
            )
            .map(([field2, type]) => (
              <MenuItem key={field2} value={field2}>
                <ListItemText>{field2}</ListItemText>
                <Chip variant="outlined" size="small" label={type} />
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      {state.config.fillColorField === 'SIMPLE' ? (
        <ColorInput
          id="fill-color-input"
          value={state.getFillColor as Color}
          onChange={(newRgbColor) =>
            dispatch?.({
              type: 'FILL_COLOR',
              id: state.id,
              getColor: newRgbColor,
              field: 'SIMPLE',
              name: state.config.fillColorName,
            })
          }
        />
      ) : (
        <>
          <ColorSelect
            value={state.config.fillColorName}
            onChange={(newColorName) =>
              dispatch?.({
                type: 'FILL_COLOR',
                id: state.id,
                getColor: colorBins({
                  attr: state.config.fillColorField,
                  domain: state.config.fieldsInfo.find(
                    (f) => f.field === state.config.fillColorField,
                  )?.domain ?? [0, 1000],
                  colors: newColorName,
                }),
                field: state.config.fillColorField,
                name: newColorName,
              })
            }
          />
        </>
      )}
    </>
  )
}
