import React from 'react';
import {
  RouteComponentProps,
  Redirect,
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import { asyncComponent } from './components/AsyncComponent';
import BottomNavigation from './components/BottomNavigation';
import CustomAppBar from './components/CustomAppBar';
import { MainRouterContext } from './contexts/MainRouterContext';

//ROUTERS
const Pokemons = asyncComponent(() =>
  import(/* webpackChunkName: "Pokemons" */ './screens/Pokemons')
);
const MyPokemons = asyncComponent(() =>
  import(/* webpackChunkName: "MyPokemons" */ './screens/MyPokemons')
);

const AppRouters = (props: RouteComponentProps) => {
  const { location } = props;
  const { checkAndUpdateRouter } = React.useContext(MainRouterContext);
  React.useEffect(() => {
    if (checkAndUpdateRouter) {
      checkAndUpdateRouter();
    }
    // eslint-disable-next-line
  }, [location.pathname]);

  return (
    <>
      <Switch>
        <Route path="/pokemons" component={Pokemons} />
        <Route path="/mypokemons" component={MyPokemons} />
        <Redirect from="*" to="/pokemons" />
      </Switch>

      <BottomNavigation />
    </>
  );
};

export default withRouter(AppRouters);
