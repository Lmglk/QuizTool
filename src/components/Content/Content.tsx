import * as React from "react";
import {Component, ReactNode} from "react";

import Paper from "@material-ui/core/Paper";

import "./Content.css";

import {answers, data} from "../../mocks/data";
import Button from "@material-ui/core/Button";
import {Quest} from "../Quest/Quest";

export interface IOption {
  title: string,
  value: boolean,
  answer: boolean
}

export interface IQuestion {
  id: number;
  title: string;
  accept: boolean;
  options: IOption[];
}

interface IContentState {
  questions: IQuestion[];
  checked: boolean
}

export class Content extends Component<any, IContentState> {
  public readonly state: IContentState;
  private countAcceptQuestions: number;

  constructor(props: any) {
    super(props);

    this.countAcceptQuestions = 0;
    this.state = {
      checked: false,
      questions: data.map(quest => ({
        id: quest.id,
        title: quest.title,
        accept: false,
        options: quest.options.map(option => ({
          title: option,
          value: false,
          answer: false
        }))
      }))
    };
  }

  public render(): ReactNode {
    const questionsNode = this.state.questions.map((quest, index) =>
      <Quest key={quest.id} question={quest} index={index + 1} checked={this.state.checked}
             turnAnswer={this.turnAnswer.bind(this, index)}/>
    );

    return (
      <Paper className="content">
        <div className="toolbar">
          <div className="check-info">
            Correct answers: {this.countAcceptQuestions} of {this.state.questions.length}
          </div>
          <Button variant="contained" color="secondary" disabled={this.state.checked}
                  onClick={this.handleClick}>
            Check
          </Button>
        </div>
        {questionsNode}
      </Paper>
    )
  }

  private turnAnswer(index: number, event: any): void {
    const newState: IQuestion[] = this.state.questions;
    const option: IOption | undefined = newState[index].options
      .find((value: IOption) => value.title === event.target.value);
    if (option) {
      option.value = event.target.checked;
    }
    this.setState({
      questions: newState
    });
  }

  private handleClick = () => {
    this.countAcceptQuestions = 0;
    const newState: IContentState = this.state;
    newState.questions.forEach((quest, index) => {
      let accept = true;
      quest.options.forEach(option => {
        answers[index].answer.forEach(answer => option.answer = answer === option.title);
        if (option.value !== option.answer) {
          accept = false;
        }
      });
      quest.accept = accept;
      if (quest.accept) {
        this.countAcceptQuestions++;
      }
    });

    newState.checked = true;
    this.setState({
      questions: newState.questions,
      checked: newState.checked
    });
  }
}