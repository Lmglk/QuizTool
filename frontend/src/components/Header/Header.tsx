import * as React from 'react';

import {Component, ReactNode} from 'react';

import AppBar from "@material-ui/core/AppBar";

import './Header.css';
import {Link} from "react-router-dom";
import {Avatar, Menu, MenuItem} from "@material-ui/core";
import App from "../App/App";

export class Header extends Component<any, any> {
  public readonly state = {
    anchorEl: undefined
  };

  public render(): ReactNode {
    const {anchorEl} = this.state;
    const open = Boolean(anchorEl);
    return (
      <AppBar className="header-wrapper" position="static">
        <div className="header">
          <div className="logo-container">
            <Link to="/home" className="logo">QuizTool</Link>
          </div>
          <div className="user-info-container">
            <MenuItem>
              <div className="user-profile" onClick={this.userProfileDropdownOpen}>
                <Avatar className="avatar">JD</Avatar>
                <div className="name">Jonh Doe</div>
                <div className="email">admin@admin.com</div>
              </div>
              <Menu id="user-profile-menu"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={this.userProfileDropdownClose}>
                <MenuItem>Profile</MenuItem>
                <MenuItem onClick={this.signOut}>Sign out</MenuItem>
              </Menu>
            </MenuItem>
          </div>
        </div>
      </AppBar>
    )
  }

  private userProfileDropdownOpen = (event: any) => {
    this.setState({anchorEl: event.currentTarget});
  };

  private userProfileDropdownClose = () => {
    this.setState({anchorEl: null});
  };

  private signOut = () => {
    App.isAuth = false;
    this.props.history.push('login');
  };
}
