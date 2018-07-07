import * as React from "react";
import {Component} from "react";

import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

import "./Login.css";
import App from "../App/App";

interface ILoginState {
  login: string;
  password: string;
}

export class Login extends Component<any, ILoginState> {
  public state: ILoginState = {
    login: "",
    password: ""
  };

  public render() {
    return (
      <div className="login-page">
        <Paper className="login-block">
          <div className="title">
            <h1>QuizTool</h1>
          </div>
          <div className="content">
            <FormGroup>
              <TextField className="form-item" label="Login" value={this.state.login}
                         onChange={this.handleChange('login')}/>
              <TextField className="form-item" label="Password" type="password" value={this.state.password}
                         onChange={this.handleChange('password')}/>
              <Button className="submit-btn" type="submit" variant="contained" color="secondary"
                      onClick={this.submit}>
                Login
              </Button>
            </FormGroup>
          </div>
        </Paper>
      </div>
    )
  }

  private handleChange = (name: string) => (event: any) => {
    this.setState({
      [name]: event.target.value
    } as ILoginState);
  };

  private submit = () => {
    App.authorization(this.state.login, this.state.password);
    if (App.isAuth) {
      this.props.history.push('/');
    }
  }
}