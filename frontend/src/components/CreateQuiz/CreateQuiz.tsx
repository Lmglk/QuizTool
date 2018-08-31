import {Component} from "react";
import * as React from "react";
import Paper from "@material-ui/core/Paper/Paper";

import './CreateQuiz.css';
import Stepper from "@material-ui/core/Stepper/Stepper";
import Step from "@material-ui/core/Step/Step";
import StepButton from "@material-ui/core/StepButton/StepButton";
import Button from "@material-ui/core/Button/Button";
import ExpansionPanel from "@material-ui/core/ExpansionPanel/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {IQuiz} from "../../types/quiz";
import App from "../App/App";
import {IQuestion} from "../../types/question";
import {IOption} from "../../types/option";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from "@material-ui/core/IconButton/IconButton";
import Divider from "@material-ui/core/Divider/Divider";

interface ICreateQuizState {
  activeStep: number;
  commonInfo: IQuiz;
  questions: IQuestion[];
}

export class CreateQuiz extends Component<any, ICreateQuizState> {
  public static itemId = 1;

  public state = {
    activeStep: 0,
    commonInfo: {
      author_id: App.userId,
      title: '',
      description: ''
    },
    questions: [{
      id: CreateQuiz.itemId++,
      title: 'Title of question',
      options: [{
        id: CreateQuiz.itemId++,
        title: 'Option1',
        value: false,
        answer: false
      }]
    }]
  };

  public render() {
    const steps = ['Common information', 'Questions', 'Options'];
    const {activeStep} = this.state;

    return (
      <Paper className="content">
        <Stepper nonLinear={true} activeStep={activeStep}>
          {steps.map((title, index) => (
            <Step key={title}>
              <StepButton onClick={this.handleStep(index)}>{title}</StepButton>
            </Step>
          ))}
        </Stepper>
        {this.getContendStep(activeStep)}
      </Paper>
    );
  }

  private getContendStep = (step: number) => {
    const { commonInfo, questions } = this.state;

    switch (step) {
      case 0:
        return (
          <div className="input-items">
            <div className="item">
              <div className="title-item">Quiz name:</div>
              <input value={commonInfo.title} onChange={this.changeHandler('title')}/>
            </div>
            <div className="item">
              <div className="title-item">Quiz description</div>
              <textarea rows={5} value={commonInfo.description} onChange={this.changeHandler('description')}/>
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

            {this.generateHTMLQuestions(questions)}

            <div className="actions">
              <Button className="action-btn" variant="contained" color="secondary" onClick={this.addQuestion}>
                Add question
              </Button>
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
              <Button className="action-btn" variant="contained" color="secondary" onClick={this.saveQuiz}>
                Finish
              </Button>
            </div>
          </div>
        );
      default:
        return <div>Page not found</div>;
    }
  };

  private generateHTMLQuestions(questions: IQuestion[]) {
    return questions.map((question, index) => (
      <ExpansionPanel key={index}>
        <ExpansionPanelSummary className="panel-head" expandIcon={<ExpandMoreIcon />}>
          <div className="panel-head-container">
            <div>{index + 1}.</div>
            <div>
              <input type="text" value={question.title} onChange={this.changeQuestionName(question)}/>
            </div>
            <div>
              <IconButton aria-label="Delete option" onClick={this.deleteQuestion(question)}>
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
        </ExpansionPanelSummary>
        <Divider />
        <ExpansionPanelDetails className="panel-body">
          <div className="options-container">
            <table className="options">
              <thead>
              <tr>
                <td>№</td>
                <td className="title">Option</td>
                <td>Answer</td>
                <td/>
              </tr>
              </thead>
              <tbody>{this.generateHTMLOptions(question)}</tbody>
            </table>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    ));
  }

  private generateHTMLOptions(question: IQuestion) {
    const { options } = question;
    return (
      options.map((option, index) => (
        <tr key={index}>
          <td>{index + 1}.</td>
          <td className="title">
            <input type="text" value={option.title} onChange={this.changeOptionName(option, question)}/>
          </td>
          <td>
            <Checkbox color="primary"/>
          </td>
          <td>
            <IconButton aria-label="Delete option" onClick={this.deleteOption(option, question)}>
              <DeleteIcon />
            </IconButton>
          </td>
        </tr>
      ))
    );
  }

  private changeHandler = (name: string) => (event: any) => {
    this.setState({
      commonInfo: {
        ...this.state.commonInfo,
        [name]: event.target.value
      }
    } as ICreateQuizState);
  };

  private addQuestion = () => {
    this.setState({
      questions: [
        ...this.state.questions,
        {
          id: CreateQuiz.itemId++,
          title: 'Title of question',
          options: [{
            id: CreateQuiz.itemId++,
            title: 'Option1',
            value: false,
            answer: false
          }]
        }
      ]
    });
  };

  private deleteQuestion = (question: IQuestion) => (event: any) => {
    event.stopPropagation();
    const { questions } = this.state;
    this.setState({
      questions: questions.filter(item => item !== question)
    });
  };

  private changeQuestionName = (question: IQuestion) => (event: any) => {
    const { questions } = this.state;
    const currQuestion: any = questions.find(item => item.id === question.id);
    currQuestion.title = event.target.value;
    this.setState({questions});
  };

  private deleteOption = (option: IOption, question: IQuestion) => () => {
    const { questions } = this.state;
    const currQuestion: any = questions.find(item => item === question);
    const { options } = currQuestion;
    currQuestion.options = options.filter((item: IOption) => item.id !== option.id);
    this.setState({questions});
  };

  private changeOptionName = (option: IOption, question: IQuestion) => (event: any) => {
    const { questions } = this.state;
    const currQuestion: any = questions.find(item => item === question);
    const { options } = currQuestion;
    const currOption = options.find((item: IOption) => item === option);
    currOption.title = event.target.value;
    this.setState({questions});
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
  };

  private saveQuiz = () => {
    console.log('Common info: ', this.state.commonInfo);
    console.log('Questions: ', this.state.questions);
  };
}