import * as React from "react";
import {Redirect, Route} from "react-router";

const PrivateRoute = ({component: Component, isAuth, ...rest }: any) => (
  <Route {...rest} render={PrivateRender(Component, isAuth)} />
);

const PrivateRender = (Component: any, isAuth: any) => {
  return (props: any) => (isAuth ? <Component {...props}/> : <Redirect to="/login"/>);
};

export default PrivateRoute;