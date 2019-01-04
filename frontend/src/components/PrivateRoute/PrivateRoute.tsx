import * as React from 'react';
import { Redirect, Route } from 'react-router';

const PrivateRoute = ({ component: Component, logged, ...rest }: any) => {
    return <Route {...rest} render={PrivateRender(Component, logged)} />;
};

const PrivateRender = (Component: any, logged: any) => {
    return (props: any) => (logged ? <Component {...props} /> : <Redirect to="/login" />);
};

export default PrivateRoute;
