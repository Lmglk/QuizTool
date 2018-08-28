import {Component} from "react";
import * as React from "react";
import Paper from "@material-ui/core/Paper/Paper";

import './CreateQuiz.css';
import Stepper from "@material-ui/core/Stepper/Stepper";
import Step from "@material-ui/core/Step/Step";
import StepButton from "@material-ui/core/StepButton/StepButton";
import Button from "@material-ui/core/Button/Button";

interface ICreateQuizState {
  activeStep: number;
}

export class CreateQuiz extends Component<any, ICreateQuizState> {
  public state = {
    activeStep: 0
  };

  public render() {
    const steps = ['Common information', 'Questions', 'Options'];
    const {activeStep} = this.state;

    return (
      <Paper className="content">
        <Stepper nonLinear={true} activeStep={activeStep}>
          {steps.map((title, index) => {
            return (
              <Step key={title}>
                <StepButton onClick={this.handleStep(index)}>{title}</StepButton>
              </Step>
            );
          })}
        </Stepper>
        {this.getContendStep(activeStep)}
      </Paper>
    );
  }

  private getContendStep = (step: number) => {
    switch (step) {
      case 0:
        return (
          <div className="input-items">
            <div className="item">
              <div className="title-item">Quiz name:</div>
              <input/>
            </div>
            <div className="item">
              <div className="title-item">Quiz description</div>
              <textarea rows={5}/>
            </div>
            <div className="actions">
              <Button className="action-btn" variant="contained" color="secondary" onClick={this.handleNextStep(step)}>
                Next
              </Button>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="input-items">
            <div className="actions">
              <Button className="action-btn" variant="contained" color="secondary" onClick={this.handleBackStep(step)}>
                Back
              </Button>
              <Button className="action-btn" variant="contained" color="secondary" onClick={this.handleNextStep(step)}>
                Next
              </Button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="input-items">
            <div className="actions">
              <Button className="action-btn" variant="contained" color="secondary" onClick={this.handleBackStep(step)}>
                Back
              </Button>
              <Button className="action-btn" variant="contained" color="secondary" onClick={this.handleNextStep(step)}>
                Finish
              </Button>
            </div>
          </div>
        );
      default:
        return <div>Page not found</div>;
    }
  };

  private handleStep = (step: number) => () => {
    this.setState({
      activeStep: step
    });
  };

  private handleNextStep = (step: number) => () => {
    this.setState({
      activeStep: step + 1
    });
  };

  private handleBackStep = (step: number) => () => {
    this.setState({
      activeStep: step - 1
    });
  }
}