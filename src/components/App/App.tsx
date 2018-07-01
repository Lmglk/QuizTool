import * as React from 'react';
import {Component} from 'react';
import {Switch} from "react-router";
import {Route} from "react-router-dom";

import {Home} from "../Home/Home";
import {Login} from "../Login/Login";

import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import {materialTheme} from "../../themes/theme";
import './App.css';

class App extends Component {
  private readonly theme = createMuiTheme(materialTheme);

  public render() {
    return (
      <MuiThemeProvider theme={this.theme}>
      <Switch>
        <Route exact={true} path="/" component={Home}/>
        <Route path="/login" component={Login}/>
      </Switch>
      </MuiThemeProvider>
    );
  }
}

export default App;
