import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { SnackbarContext } from './contexts/SnackbarContext';
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
import { MyPokemonContext } from './contexts/MyPokemonContext';
import { IconButton } from '@material-ui/core';
import MDIcon from './components/MDIcon';
import BottomNavigation from './components/BottomNavigation';
import { renderRoutes } from 'react-router-config';
import routes from './routes';

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

  const {
    shouldUpdate,
    refreshPage,
    countDown,
    checkAppInstalledStatus,
  } = React.useContext(ServiceWorkerContext);

  React.useEffect(() => {
    if (fetchMyPokemons) fetchMyPokemons();
    if (checkAppInstalledStatus) checkAppInstalledStatus();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      {renderRoutes(routes)}
      <BottomNavigation />
      <Snackbar
        open={!!isOpened}
        autoHideDuration={autoHideDuration}
        onClose={close}
        message={!severity && message}
        style={{ bottom: '70px' }}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={close}
          >
            <MDIcon icon="close" />
          </IconButton>,
        ]}
        data-testid="snackbar"
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
