import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, ...rest }) => {
  const isLogged = useSelector((state) => state.user.isLogged);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLogged ? children : <Redirect to={{ pathname: '/login', state: { from: location } }} />
      }
    />
  );
};

export default ProtectedRoute;
