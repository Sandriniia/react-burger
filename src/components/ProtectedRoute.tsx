import React, { FC } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAppSelector } from '../services/types/hooks';

const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const isLogged = useAppSelector((state) => state.user.isLogged);

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
