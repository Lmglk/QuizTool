import * as React from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import './Login.css';

interface ILoginProps {
    email: string;
    password: string;
    changeField(name: string): any;
    login(): any;
}

export const Login = (props: ILoginProps) => (
    <div className="login-page">
        <Paper className="login-block">
            <div className="title">
                <h1>QuizTool</h1>
            </div>
            <div className="content">
                <FormGroup>
                    <TextField className="form-item" label="Email" value={props.email} onChange={props.changeField('email')} />
                    <TextField
                        className="form-item"
                        label="Password"
                        type="password"
                        value={props.password}
                        onChange={props.changeField('password')}
                    />
                    <Link to="/registration" className="link">
                        Sign up
                    </Link>
                    <Button className="submit-btn" type="submit" variant="contained" color="secondary" onClick={props.login}>
                        Login
                    </Button>
                </FormGroup>
            </div>
        </Paper>
    </div>
);
