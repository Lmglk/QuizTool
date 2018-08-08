import * as React from "react";
import {Component, ReactNode} from "react";

import Paper from "@material-ui/core/Paper";

import "./Quiz.css";

import {answers} from "../../mocks/data";
import Button from "@material-ui/core/Button";
import {Quest} from "../Quest/Quest";
import {IQuestion} from "../../types/question";
import {IOption} from "../../types/option";

interface IContentState {
  questions: IQuestion[];
  checked: boolean
}

export class Quiz extends Component<any, IContentState> {
  public readonly state: IContentState = {
    checked: false,
    questions: []
  };

  private countAcceptQuestions: number;
  private quizId: string;

  constructor(props: any) {
    super(props);
    this.quizId = props.match.params.id;
    this.countAcceptQuestions = 0;
  }

  public async componentDidMount() {
    try {
      const response = await fetch(`http://localhost:4200/api/quiz/getQuestionsByTestId/${this.quizId}`);
      const data = await response.json();
      const questions = data.questions.map((quest: any) => ({
        id: quest.id,
        title: quest.title,
        accept: false,
        options: quest.options.map((option: string) => ({
          title: option,
          value: false,
          answer: false
        }))
      }));
      this.setState({questions});
    } catch (e) {
      console.error('Loading of quiz - FAIL')
    }
  }

  public render(): ReactNode {
    const { questions, checked } = this.state;

    const questionsNode = questions.map((quest, index) =>
      <Quest key={quest.id} question={quest} index={index + 1} checked={checked}
             turnAnswer={this.turnAnswer(index)}/>
    );

    return (
      <Paper className="content">
        <div className="toolbar">
          <div className="check-info">
            Correct answers: {this.countAcceptQuestions} of {questions.length}
          </div>
          <Button variant="contained" color="secondary" disabled={checked}
                  onClick={this.handleClick}>
            Check
          </Button>
        </div>
        {questionsNode}
      </Paper>
    )
  }

  private turnAnswer = (index: number) => (event: any) => {
    const newState: IQuestion[] = this.state.questions;
    const option: IOption | undefined = newState[index].options
      .find((value: IOption) => value.title === event.target.value);
    if (option) {
      option.value = event.target.checked;
    }
    this.setState({
      questions: newState
    });
  };

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