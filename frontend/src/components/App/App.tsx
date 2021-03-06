import * as React from 'react';
import { Component } from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';

import { Home } from '../Home/Home';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { materialTheme } from '../../themes/theme';
import './App.css';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import { config } from '../../config/app.config';
import { RegistrationContainer } from '../Registration/RegistrationContainer';
import { LoginContainer } from '../Login/LoginContainer';

class App extends Component<any, any> {
    public static userId: string;
    public static isAuth = false;

    public static async authorization(email: string, password: string) {
        if (email.trim() && password.trim()) {
            const res = await fetch(`${config.SERVER_API}/auth/signin`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const { id, token } = await res.json();
            if (token) {
                App.isAuth = true;
                App.userId = id;
                return true;
            }
        }

        return false;
    }

    private readonly theme = createMuiTheme(materialTheme);

    public render() {
        return (
            <MuiThemeProvider theme={this.theme}>
                <Switch>
                    <Route path="/login" component={LoginContainer} />
                    <Route path="/registration" component={RegistrationContainer} />
                    <PrivateRoute path="/" logged={App.isAuth} component={Home} />
                </Switch>
            </MuiThemeProvider>
        );
    }
}

export default App;
