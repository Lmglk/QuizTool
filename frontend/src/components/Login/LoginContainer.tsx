import * as React from 'react';
import { Component, ReactNode } from 'react';
import App from '../App/App';
import { Login } from './Login';

interface ILoginState {
    email: string;
    password: string;
}

export class LoginContainer extends Component<any, ILoginState> {
    public state: ILoginState = {
        email: '',
        password: '',
    };

    public render(): ReactNode {
        return <Login email={this.state.email} password={this.state.password} changeField={this.handleChange} login={this.login} />;
    }

    private handleChange = (name: string) => (event: any) => {
        this.setState({
            [name]: event.target.value,
        } as ILoginState);
    };

    private login = async () => {
        if (await App.authorization(this.state.email, this.state.password)) {
            this.props.history.push('/home');
        }
    };
}
