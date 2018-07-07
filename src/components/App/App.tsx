import * as React from 'react';
import {Component} from 'react';
import {Switch} from "react-router";
import {Route} from "react-router-dom";

import {Home} from "../Home/Home";
import {Login} from "../Login/Login";

import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import {materialTheme} from "../../themes/theme";
import './App.css';
import PrivateRouter from '../PrivateRoute/PrivateRoute';

class App extends Component {
  public static isAuth = false;
  public static authorization(login: string, password: string) {
    if (login === 'admin' && password === 'admin') {
      App.isAuth = true;
    }
  };

  private readonly theme = createMuiTheme(materialTheme);

  public render() {
    return (
      <MuiThemeProvider theme={this.theme}>
      <Switch>
        <PrivateRouter exact={true} path="/" isAuth={App.isAuth} component={Home}/>
        <Route path="/login" component={Login}/>
      </Switch>
      </MuiThemeProvider>
    );
  }
}

export default App;
