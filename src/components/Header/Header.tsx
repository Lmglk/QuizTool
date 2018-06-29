import * as React from 'react';

import {Component, ReactNode} from 'react';

import AppBar from "@material-ui/core/AppBar";

import './Header.css';

export class Header extends Component {
  public render(): ReactNode {
    return (
      <AppBar className="header-wrapper" position="static">
        <div className="header">
          <div className="logo-container">
            <a className="logo" href="#">QuizTool</a>
          </div>
          <div className="user-info-container"/>
        </div>
      </AppBar>
    )
  }
}