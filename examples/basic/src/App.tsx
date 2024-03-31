import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Form } from '@/components';
import { ThemeProvider, createTheme } from '@mui/material';
import type { ThemeOptions } from '@mui/material';

export const themeOptions: ThemeOptions = {
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        variant: 'contained',
      },
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
      },
    },
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#ff9800',
    },
    secondary: {
      main: '#039be5',
    },
  },
};

const theme = createTheme(themeOptions);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Form />
    </ThemeProvider>
  );
}

export default App;
