import * as React from 'react';
import { Link } from 'react-router-dom';
import { Paper } from '@material-ui/core';

import FormGroup from '@material-ui/core/FormGroup/FormGroup';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';

import './Registration.css';

interface IRegistrationProps {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    changeField(name: string): any;
    submit(): void;
}

export const Registration = (props: IRegistrationProps) => (
    <div className="registration-page">
        <Paper className="registration-block">
            <div className="title">
                <h1>Registration</h1>
            </div>
            <div className="content">
                <Link to="/login" className="link link-back">
                    <ArrowBack className="arrow-back-icon" style={{ fontSize: '1em' }} />
                    Back to login
                </Link>
                <FormGroup>
                    <TextField className="form-item" label="Email" value={props.email} onChange={props.changeField('email')} />

                    <div className="password-container form-item">
                        <TextField label="Password" type="password" value={props.password} onChange={props.changeField('password')} />

                        <TextField
                            label="Confirm password"
                            type="password"
                            value={props.confirmPassword}
                            onChange={props.changeField('confirmPassword')}
                        />
                    </div>

                    <TextField className="form-item" label="First Name" value={props.firstName} onChange={props.changeField('firstName')} />

                    <TextField className="form-item" label="LastName" value={props.lastName} onChange={props.changeField('lastName')} />

                    <Button className="submit-btn" type="submit" variant="contained" color="secondary" onClick={props.submit}>
                        Sign up
                    </Button>
                </FormGroup>
            </div>
        </Paper>
    </div>
);
