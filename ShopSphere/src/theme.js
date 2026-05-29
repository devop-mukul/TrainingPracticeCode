import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1b5e20',
      light: '#4c8c4a',
      dark: '#003300',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff8f00',
      contrastText: '#111111',
    },
    background: {
      default: '#f7f9fc',
      paper: '#ffffff',
    },
    text: {
      primary: '#1f2937',
      secondary: '#4b5563',
    },
    divider: '#dbe2ea',
    action: {
      hover: 'rgba(27, 94, 32, 0.08)',
    },
  },
  shape: {
    borderRadius: 2,
  },
  components: {
    // MuiButton: {
    //   defaultProps: {
    //     disableElevation: true,
    //   },
    //   styleOverrides: {
    //     root: {
    //       textTransform: 'none',
    //       fontWeight: 600,
    //       borderRadius: 10,
    //     },
    //   },
    // },
    // MuiCard: {
    //   styleOverrides: {
    //     root: {
    //       borderRadius: 14,
    //     },
    //   },
    // },
  },
})

export default theme
