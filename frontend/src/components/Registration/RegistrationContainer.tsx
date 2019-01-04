import * as React from 'react';
import { Component, ReactNode } from 'react';
import { config } from '../../config/app.config';
import { Registration } from './Registration';

interface IRegistrationState {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
}

export class RegistrationContainer extends Component<any, IRegistrationState> {
    public state: IRegistrationState = {
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
    };

    public render(): ReactNode {
        return (
            <Registration
                email={this.state.email}
                password={this.state.password}
                confirmPassword={this.state.confirmPassword}
                firstName={this.state.firstName}
                lastName={this.state.lastName}
                changeField={this.handleChange}
                submit={this.submit}
            />
        );
    }

    private handleChange = (name: string) => (event: any) => {
        this.setState({
            [name]: event.target.value,
        } as IRegistrationState);
    };

    private submit = async () => {
        if (this.state.password === this.state.confirmPassword) {
            const res = await fetch(`${config.SERVER_API}/auth/signup`, {
                method: 'POST',
                headers: {
                    Accept: 'Application/json',
                    'Content-Type': 'Application/json',
                },
                body: JSON.stringify(this.state),
            });

            if (res.status === 200) {
                this.props.history.push('/login');
            } else {
                const { errors } = await res.json();
                console.log(errors);
            }
        } else {
            console.error('Password is not equal');
        }
    };
}
