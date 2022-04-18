import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export function ProtectedNotAuthRoute({ component: Component, ...props }) {
  return (
    <Route>{() => (props.isLogged ? <Component {...props} /> : <Redirect to='/login' />)}</Route>
  );
}

export function ProtectedAuthRoute({ component: Component, ...props }) {
  return <Route>{() => (props.isLogged ? <Redirect to='/' /> : <Component {...props} />)}</Route>;
}
