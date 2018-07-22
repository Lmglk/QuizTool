import * as React from 'react';

import {Component, ReactNode} from 'react';

import AppBar from "@material-ui/core/AppBar";

import './Header.css';
import {Link} from "react-router-dom";

export class Header extends Component {
  public render(): ReactNode {
    return (
      <AppBar className="header-wrapper" position="static">
        <div className="header">
          <div className="logo-container">
            <Link to="/home" className="logo">QuizTool</Link>
          </div>
          <div className="user-info-container"/>
        </div>
      </AppBar>
    )
  }
}
