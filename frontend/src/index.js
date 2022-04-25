import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './HomePage';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    h1: {
      fontFamily: 'fantasy',
      fontSize: 40,
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
