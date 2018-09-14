import * as React from 'react';

import {Component, ReactNode} from 'react';

import AppBar from "@material-ui/core/AppBar";

import './Header.css';
import {Link} from "react-router-dom";
import {Avatar, Menu, MenuItem} from "@material-ui/core";
import App from "../App/App";
import Button from "@material-ui/core/Button/Button";
import {config} from "../../config/app.config";

interface IHeaderState {
  anchorEl: any;
  userInfo: {
    email: string;
    firstName: string;
    lastName: string;
  }
}

export class Header extends Component<any, IHeaderState> {
  private static getInitials(firstName: string, lastName: string): string {
    return (`${firstName[0]}${lastName[0]}`).toUpperCase();
  }

  private static getFullName(firstName: string, lastName: string): string {
    return `${firstName} ${lastName}`
  }

  public readonly state = {
    anchorEl: undefined,
    userInfo: {
      email: '',
      firstName: '',
      lastName: '',
    }
  };

  public render(): ReactNode {
    const { anchorEl, userInfo } = this.state;
    const initials = Header.getInitials(userInfo.firstName, userInfo.lastName);
    const fullName = Header.getFullName(userInfo.firstName, userInfo.lastName);
    const open = Boolean(anchorEl);
    return (
      <AppBar className="header-wrapper" position="static">
        <div className="header">
          <div className="logo-container">
            <Link to="/home" className="logo">QuizTool</Link>
          </div>
          <div>
            <Button className="quiz-create-btn" variant="contained" color="secondary"
                    onClick={this.quizCreate}>
              Create quiz
            </Button>
          </div>
          <div className="user-info-container">
            <MenuItem>
              <div className="user-profile" onClick={this.userProfileDropdownOpen}>
                <Avatar className="avatar">{initials}</Avatar>
                <div className="name">{fullName}</div>
                <div className="email">{userInfo.email}</div>
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

  public async componentDidMount() {
    try {
      const response = await fetch(`${config.SERVER_API}/user/getInfo/${App.userId}`);
      const data = await response.json();
      this.setState({userInfo: data});
    } catch (e) {
      console.error('Loading info about user - FAIL');
    }
  }

  private quizCreate = () => {
    this.props.history.push('/quiz-create');
  };

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
