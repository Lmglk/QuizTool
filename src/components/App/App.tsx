import * as React from 'react';
import {Component} from 'react';

import {Header} from '../Header/Header';
import {Page} from '../Page/Page';
import {Sidebar} from "../Sidebar/Sidebar";

import './App.css';

import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      dark: '#0e141a',
      light: '#5e646b',
      main: '#343a40'
    },
    secondary: {
      dark: '#79b700',
      light: '#e4ff54',
      main: '#aeea00'
    }
  }
});

class App extends Component {
  public render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="app">
          <Header/>
          <Sidebar/>
          <Page/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
