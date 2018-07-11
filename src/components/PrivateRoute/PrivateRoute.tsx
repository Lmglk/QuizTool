import * as React from "react";
import {Redirect, Route} from "react-router";
import App from "../App/App";

const PrivateRoute = ({component: Component, logged, ...rest }: any) => {
  console.log(`isLogged: ${App.isAuth}`);
  return <Route {...rest} render={PrivateRender(Component, logged)}/>;
};

const PrivateRender = (Component: any, logged: any) => {
  return (props: any) => (logged ? <Component {...props}/> : <Redirect to="/login"/>);
};

export default PrivateRoute;