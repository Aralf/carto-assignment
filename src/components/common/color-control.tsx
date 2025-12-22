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
import { ColorInput } from '@/components/common/color-input.tsx'
import { ColorSelect } from '@/components/common/color-select.tsx'
import { AppDispatchContext } from '@/components/provider.tsx'

export const ColorControl = ({
  state,
  dataFields,
  field,
}: {
  state: CustomVectorTileLayerProps
  dataFields: Record<string, string>
  field: 'fill' | 'stroke'
}) => {
  const dispatch = use(AppDispatchContext)
  const actionType = field === 'fill' ? 'FILL_COLOR' : 'STROKE_COLOR'

  return (
    <>
      <FormControl>
        <InputLabel htmlFor={`${field}-color-input`}>Color</InputLabel>
        <Select
          value={state.config[`${field}ColorField`]}
          onChange={(e) => {
            const newValue = e.target.value
            dispatch?.({
              type: actionType,
              id: state.id,
              getColor:
                newValue === 'SIMPLE'
                  ? [0, 0, 200]
                  : colorBins({
                      attr: newValue,
                      domain: state.config.fieldsInfo.find(
                        (f) => f.field === newValue,
                      )?.domain ?? [0, 1000],
                      colors: state.config[`${field}ColorNameDefault`],
                    }),
              field: newValue,
              name: state.config[`${field}ColorName`],
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
      {state.config[`${field}ColorField`] === 'SIMPLE' ? (
        <ColorInput
          id={`${field}-color-input`}
          value={
            (field === 'fill'
              ? state.getFillColor
              : state.getLineColor) as Color
          }
          onChange={(newRgbColor) =>
            dispatch?.({
              type: actionType,
              id: state.id,
              getColor: newRgbColor,
              field: 'SIMPLE',
              name: state.config[`${field}ColorName`],
            })
          }
        />
      ) : (
        <>
          <ColorSelect
            value={state.config[`${field}ColorName`]}
            onChange={(newColorName) =>
              dispatch?.({
                type: actionType,
                id: state.id,
                getColor: colorBins({
                  attr: state.config[`${field}ColorField`],
                  domain: state.config.fieldsInfo.find(
                    (f) => f.field === state.config[`${field}ColorField`],
                  )?.domain ?? [0, 1000],
                  colors: newColorName,
                }),
                field: state.config[`${field}ColorField`],
                name: newColorName,
              })
            }
          />
        </>
      )}
    </>
  )
}
