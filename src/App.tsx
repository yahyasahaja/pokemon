import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { SnackbarContext } from './contexts/SnackbarContext';
import AppRouters from './AppRouters';
import axios from 'axios';
import { BASE_URL } from './config';
import OverlayLoading from './components/OverlayLoading';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import { ServiceWorkerContext } from './contexts/ServiceWorkerContext';
import { BrowserRouter } from 'react-router-dom';
import { MyPokemonContext } from './contexts/MyPokemonContext';

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers['Accept'] = 'application/json';
axios.defaults.headers['Content-Type'] = 'application/json';

const App = () => {
  const {
    autoHideDuration,
    isOpened,
    message,
    severity,
    close,
  } = React.useContext(SnackbarContext);

  const { fetchMyPokemons } = React.useContext(MyPokemonContext);

  const { shouldUpdate, refreshPage, countDown } = React.useContext(
    ServiceWorkerContext
  );

  React.useEffect(() => {
    if (fetchMyPokemons) fetchMyPokemons();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <AppRouters />
      </BrowserRouter>
      <Snackbar
        open={!!isOpened}
        autoHideDuration={autoHideDuration}
        onClose={close}
        message={!severity && message}
      >
        {severity && (
          <Alert onClose={close} severity={severity}>
            {message}
          </Alert>
        )}
      </Snackbar>
      <section>
        <Dialog open={shouldUpdate}>
          <DialogTitle>Application update is available!</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Click reload to update the app
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={refreshPage}>{`Reload ${countDown}`}</Button>
          </DialogActions>
        </Dialog>
      </section>
      <OverlayLoading />
    </div>
  );
};

export default App;
