import * as React from 'react';
import { Link } from 'react-router-dom';

import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Paper from '@material-ui/core/Paper';
import HomeIcon from '@material-ui/icons/Home';

import './Sidebar.css';

export const Sidebar = () => (
    <Paper className="sidebar">
        <MenuList>
            <Link to="/home" className="link">
                <MenuItem>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </MenuItem>
            </Link>
        </MenuList>
    </Paper>
);
