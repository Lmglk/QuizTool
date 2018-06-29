import * as React from 'react';
import {Component} from 'react';

import './Sidebar.css';
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";

import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';
import Paper from "@material-ui/core/Paper";

export class Sidebar extends Component {

  public render() {
    return (
      <Paper className="sidebar">
        <MenuList>
          <MenuItem>
            <ListItemIcon>
              <HomeIcon/>
            </ListItemIcon>
            <ListItemText primary="Home"/>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <ListIcon/>
            </ListItemIcon>
            <ListItemText primary="List of tests"/>
          </MenuItem>
        </MenuList>
      </Paper>
    );
  }
}