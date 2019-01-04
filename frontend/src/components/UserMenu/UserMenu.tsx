import { Avatar, Menu, MenuItem } from '@material-ui/core';
import * as React from 'react';
import { SyntheticEvent } from 'react';

interface IUserMenuProps {
    initials: string;
    fullName: string;
    email: string;
    anchorEl: any;
    open: boolean;
    openMenu(event: SyntheticEvent): void;
    closeMenu(): void;
    signOut(): void;
}

export const UserMenu = (props: IUserMenuProps) => (
    <MenuItem>
        <div className="user-profile" onClick={props.openMenu}>
            <Avatar className="avatar">{props.initials}</Avatar>
            <div className="name">{props.fullName}</div>
            <div className="email">{props.email}</div>
        </div>
        <Menu
            id="user-profile-menu"
            anchorEl={props.anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={props.open}
            onClose={props.closeMenu}
            className="user-menu"
        >
            <MenuItem>Profile</MenuItem>
            <MenuItem onClick={props.signOut}>Sign out</MenuItem>
        </Menu>
    </MenuItem>
);
