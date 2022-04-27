import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './HomePage';
import { ThemeProvider, createTheme} from '@mui/material/styles';

const theme = createTheme({
  typography: {
    h1: {
      fontFamily: 'fantasy',
      fontSize: 40,
    },
  },
  palette: {
    primary: {
      main: '#01579b',
    },
    secondary: {
      main: '#424242',
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <HomePage />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('home')
);
