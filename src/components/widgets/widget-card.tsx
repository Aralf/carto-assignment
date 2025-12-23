import { Suspense } from 'react'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import type { ReactNode } from 'react'

export const WidgetCard = ({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) => {
  return (
    <Card>
      <CardHeader title={title} />
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              fallbackRender={({ resetErrorBoundary }) => (
                <Stack spacing={1}>
                  <Typography>There was an error!</Typography>
                  <Button
                    variant="contained"
                    onClick={() => resetErrorBoundary()}
                  >
                    Try again
                  </Button>
                </Stack>
              )}
            >
              <Suspense fallback={<CircularProgress variant="indeterminate" />}>
                {children}
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </CardContent>
    </Card>
  )
}
