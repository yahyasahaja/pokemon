import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { SnackbarStore } from './contexts/SnackbarContext';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { COLORS } from './config';
import { OverlayLoadingStore } from './contexts/OverlayLoadingContext';
import { ServiceWorkerStore } from './contexts/ServiceWorkerContext';
import { WindowStackStore } from './contexts/WindowStackContext';
import { MainRouterStore } from './contexts/MainRouterContext';
import { PokemonStore } from './contexts/PokemonContext';
import { MyPokemonStore } from './contexts/MyPokemonContext';

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
      <ServiceWorkerStore>
        <MainRouterStore>
          <WindowStackStore>
            <PokemonStore>
              <MyPokemonStore>
                <MuiThemeProvider theme={MUITheme}>
                  <App />
                </MuiThemeProvider>
              </MyPokemonStore>
            </PokemonStore>
          </WindowStackStore>
        </MainRouterStore>
      </ServiceWorkerStore>
    </SnackbarStore>
  </OverlayLoadingStore>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
