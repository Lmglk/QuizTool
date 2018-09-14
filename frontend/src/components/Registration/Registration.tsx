import {Component} from "react";
import * as React from "react";
import {Paper} from "../../../node_modules/@material-ui/core";

import './Registration.css';
import FormGroup from "@material-ui/core/FormGroup/FormGroup";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import {Link} from "react-router-dom";

import ArrowBack from '@material-ui/icons/ArrowBack';
import {config} from "../../config/app.config";

interface IRegistrationState {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

export class Registration extends Component<any, IRegistrationState> {
  public state: IRegistrationState = {
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  };

  public render() {
    return (
      <div className="registration-page">
        <Paper className="registration-block">
          <div className="title">
            <h1>Registration</h1>
          </div>
          <div className="content">
            <Link to="/login" className="link link-back">
              <ArrowBack className="arrow-back-icon" style={{fontSize: '1em'}}/>
              Back to login
            </Link>
            <FormGroup>
              <TextField className="form-item" label="Email"
                         value={this.state.email}
                         onChange={this.handleChange('email')}/>

              <div className="password-container form-item">
                <TextField label="Password" type="password"
                           value={this.state.password}
                           onChange={this.handleChange('password')}/>

                <TextField label="Confirm password" type="password"
                           value={this.state.confirmPassword}
                           onChange={this.handleChange('confirmPassword')}/>
              </div>

              <TextField className="form-item" label="First Name"
                         value={this.state.firstName}
                         onChange={this.handleChange('firstName')}/>

              <TextField className="form-item" label="LastName"
                         value={this.state.lastName}
                         onChange={this.handleChange('lastName')}/>

              <Button className="submit-btn" type="submit" variant="contained" color="secondary"
                      onClick={this.submit}>
                Sign up
              </Button>
            </FormGroup>
          </div>
        </Paper>
      </div>
    );
  }

  private handleChange = (name: string) => (event: any) => {
    this.setState({
      [name]: event.target.value
    } as IRegistrationState);
  };

  private submit = async () => {
    if (this.state.password === this.state.confirmPassword) {
      const res = await fetch(`${config.SERVER_API}/auth/signup`, {
        method: 'POST',
        headers: {
          'Accept': 'Application/json',
          'Content-Type': 'Application/json'
        },
        body: JSON.stringify(this.state)
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
  }
}