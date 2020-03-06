import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { SnackbarStore } from './contexts/SnackbarContext';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { COLORS } from './config';
import { OverlayLoadingStore } from './contexts/OverlayLoadingContext';

const MUITheme = createMuiTheme({
  palette: {
    primary: {
      main: COLORS.primary,
    },
    secondary: {
      main: COLORS.secondary,
    },
  },
});

ReactDOM.render(
  <OverlayLoadingStore>
    <SnackbarStore>
      <MuiThemeProvider theme={MUITheme}>
        <App />
      </MuiThemeProvider>
    </SnackbarStore>
  </OverlayLoadingStore>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
