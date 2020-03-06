import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { asyncComponent } from './components/AsyncComponent';
import BottomNavigation from './components/BottomNavigation';

//ROUTERS
// const Users = asyncComponent(() =>
//   import(/* webpackChunkName: "Users" */ './screens/Users')
// );

function AppRouters() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route path="/users" exact component={Users} /> */}
        <Redirect from="*" to="/users" />
      </Switch>

      <BottomNavigation />
    </BrowserRouter>
  );
}

export default AppRouters;
