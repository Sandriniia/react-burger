import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const ProtectedNotAuthRoute = ({ component: Component, ...props }) => {
  return (
    <Route>{() => (props.isLogged ? <Component {...props} /> : <Redirect to='/login' />)}</Route>
  );
}

export const ProtectedAuthRoute = ({ component: Component, ...props }) => {
  return <Route>{() => (props.isLogged ? <Redirect to='/' /> : <Component {...props} />)}</Route>;
}
