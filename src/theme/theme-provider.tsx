import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from '@carto/meridian-ds/theme'
import type { ReactNode } from 'react'

export const CartoThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
