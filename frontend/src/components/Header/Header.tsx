import * as React from 'react';
import { Component, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { config } from '../../config/app.config';

import App from '../App/App';
import { UserMenuContainer } from '../UserMenu/UserMenuContainer';

import Button from '@material-ui/core/Button/Button';
import AppBar from '@material-ui/core/AppBar';
import './Header.css';

interface IHeaderState {
    userInfo: {
        email: string;
        firstName: string;
        lastName: string;
    };
}

export class Header extends Component<any, IHeaderState> {
    public readonly state = {
        userInfo: {
            email: '',
            firstName: '',
            lastName: '',
        },
    };

    public render(): ReactNode {
        return (
            <AppBar className="header-wrapper" position="static">
                <div className="header">
                    <div className="logo-container">
                        <Link to="/home" className="logo">
                            QuizTool
                        </Link>
                    </div>
                    <div>
                        <Button className="quiz-create-btn" variant="contained" color="secondary" onClick={this.quizCreate}>
                            Create quiz
                        </Button>
                    </div>
                    <div className="user-info-container">
                        <UserMenuContainer userInfo={this.state.userInfo} history={this.props.history} />
                    </div>
                </div>
            </AppBar>
        );
    }

    public async componentDidMount() {
        try {
            const response = await fetch(`${config.SERVER_API}/user/getInfo/${App.userId}`);
            const data = await response.json();
            this.setState({ userInfo: data });
        } catch (e) {
            console.error('Loading info about user - FAIL');
        }
    }

    private quizCreate = () => {
        this.props.history.push('/quiz-create');
    };
}
