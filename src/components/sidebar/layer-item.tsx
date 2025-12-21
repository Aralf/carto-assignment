import { Suspense, use, useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
  IconButton,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
  styled,
} from '@mui/material'
import {
  ErrorOutline,
  ExpandMoreOutlined,
  InfoOutline,
} from '@mui/icons-material'
import { ErrorBoundary } from 'react-error-boundary'
import type { FallbackProps } from 'react-error-boundary'
import type { TilejsonResult, VectorTileLayerProps } from '@deck.gl/carto'
import { ToggleVisibilityButton } from '@/components/sidebar/toggle-visibility-button.tsx'
import { FillSection } from '@/components/sidebar/fill-section.tsx'
import { StrokeSection } from '@/components/sidebar/stroke-section.tsx'
import { RadiusSection } from '@/components/sidebar/radius-section.tsx'

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
  const layerData = use(state.data as Promise<TilejsonResult>)

  const geometryType = layerData.vector_layers[0].geometry_type ?? 'unknown'

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
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="body2">Type: {geometryType}</Typography>
          {geometryType === 'Point' ? (
            <>
              <Divider />
              <RadiusSection state={state} />
            </>
          ) : null}
          <Divider />
          <FillSection state={state} />
          <Divider />
          <StrokeSection state={state} />
        </CardContent>
      </Collapse>
    </StyledCard>
  )
}

export const LayerItemSkeleton = () => (
  <StyledCard variant="outlined">
    <CardHeader
      title={<Skeleton width={140} height={24} />}
      action={
        <Stack
          direction="row"
          spacing={0.5}
          sx={{
            width: 68,
            height: 32,
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <Skeleton
            variant="circular"
            sx={{ width: 24, height: 24, marginInlineEnd: 0.5 }}
          />
        </Stack>
      }
    />
  </StyledCard>
)

export const LayerItemError = ({ error }: FallbackProps) => (
  <StyledCard variant="outlined" color="error">
    <CardHeader
      title={
        <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
          <ErrorOutline color="error" />
          <Typography variant="body1">Something went wrong</Typography>
        </Stack>
      }
      slotProps={{ title: { variant: 'body1' } }}
      action={
        <Stack
          direction="row"
          spacing={0.5}
          sx={{
            width: 68,
            height: 32,
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingInlineEnd: 1,
          }}
        >
          <Tooltip title={error.message}>
            <InfoOutline />
          </Tooltip>
        </Stack>
      }
    />
  </StyledCard>
)

export const LayerItemWrapper = ({
  state,
}: {
  state: VectorTileLayerProps
}) => {
  return (
    <ErrorBoundary FallbackComponent={LayerItemError}>
      <Suspense fallback={<LayerItemSkeleton />}>
        <LayerItem state={state} />
      </Suspense>
    </ErrorBoundary>
  )
}
