import red from '@material-ui/core/colors/red';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      main: '#299fff',
      dark: '#7190c9'
    },
    secondary: {
      main: '#fff',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#ffffff',
    },
  },
    overrides: {
      MuiButton: {
        containedPrimary: {
          color: '#ffffff',
        },
      },
      MuiTableHead: {
        root: {
          backgroundColor: '#7190c9'
        }
      }
    }
});

export default theme;
