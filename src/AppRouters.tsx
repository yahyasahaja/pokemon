import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { asyncComponent } from './components/AsyncComponent';

//ROUTERS
const Users = asyncComponent(() =>
  import(/* webpackChunkName: "Users" */ './screens/Users')
);

function AppRouters() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/users" exact component={Users} />
        <Redirect from="*" to="/users" />
      </Switch>
    </BrowserRouter>
  );
}

export default AppRouters;
