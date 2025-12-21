import { useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  Stack,
  styled,
} from '@mui/material'
import { ExpandMoreOutlined } from '@mui/icons-material'
import type { VectorTileLayerProps } from '@deck.gl/carto'
import { ToggleVisibilityButton } from '@/components/sidebar/toggle-visibility-button.tsx'
import { FillColor } from '@/components/sidebar/fill-color.tsx'

const StyledCard = styled(Card)`
  #toggle-visibility-button {
    visibility: hidden;
  }

  &:hover #toggle-visibility-button,
  #toggle-visibility-button[data-visible='false'] {
    visibility: visible;
  }

  #expand-icon {
    transition: transform 0.2s ease-in-out;
  }

  &[data-open='true'] #expand-icon {
    transform: rotate(180deg);
  }
`

export const LayerItem = ({ state }: { state: VectorTileLayerProps }) => {
  const [open, setOpen] = useState(false)
  return (
    <StyledCard variant="outlined" data-open={open}>
      <CardHeader
        title={state.id}
        slotProps={{ title: { variant: 'body1' } }}
        action={
          <Stack direction="row" spacing={0.5}>
            <ToggleVisibilityButton state={state} />
            <IconButton onClick={() => setOpen((prev) => !prev)}>
              <ExpandMoreOutlined id="expand-icon" />
            </IconButton>
          </Stack>
        }
      />
      <Collapse in={open}>
        <CardContent>
          <FillColor state={state} />
        </CardContent>
      </Collapse>
    </StyledCard>
  )
}
