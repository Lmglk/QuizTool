import * as React from 'react';
import { Component, ReactNode } from 'react';
import { UserMenu } from './UserMenu';
import App from '../App/App';

interface IUserMenuState {
    anchorEl: any;
    userInfo: {
        email: string;
        firstName: string;
        lastName: string;
    };
}

export class UserMenuContainer extends Component<any, IUserMenuState> {
    private static getInitials(firstName: string, lastName: string): string {
        return `${firstName[0]}${lastName[0]}`.toUpperCase();
    }

    private static getFullName(firstName: string, lastName: string): string {
        return `${firstName} ${lastName}`;
    }

    public readonly state = {
        anchorEl: undefined,
        userInfo: {
            email: '',
            firstName: '',
            lastName: '',
        },
    };

    public render(): ReactNode {
        const { userInfo } = this.props;
        const initials = UserMenuContainer.getInitials(userInfo.firstName, userInfo.lastName);
        const fullName = UserMenuContainer.getFullName(userInfo.firstName, userInfo.lastName);
        const open = Boolean(this.state.anchorEl);

        return (
            <UserMenu
                initials={initials}
                fullName={fullName}
                email={userInfo.email}
                anchorEl={this.state.anchorEl}
                open={open}
                openMenu={this.userProfileDropdownOpen}
                closeMenu={this.userProfileDropdownClose}
                signOut={this.signOut}
            />
        );
    }

    private userProfileDropdownOpen = (event: any) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    private userProfileDropdownClose = () => {
        this.setState({ anchorEl: null });
    };

    private signOut = () => {
        App.isAuth = false;
        this.props.history.push('login');
    };
}
