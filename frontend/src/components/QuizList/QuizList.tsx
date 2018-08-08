import * as React from "react";
import {Component} from "react";
import {Link} from "react-router-dom";
import Paper from "@material-ui/core/Paper";

import "./QuizList.css";
import Button from "@material-ui/core/Button";
import {IQuiz} from "../../types/quiz";

interface IQuizListState {
  quizList: IQuiz[];
}

export class QuizList extends Component<any, IQuizListState> {
  public readonly state: IQuizListState = {
    quizList: []
  };

  public async componentDidMount() {
    try {
      const response = await fetch('http://localhost:4200/api/quiz/getAll');
      const data = await response.json();
      this.setState({quizList: data});
    } catch (e) {
      console.error('Loading list of quiz - FAIL');
    }
  }

  public render() {
    const quizListNode = this.state.quizList.map(quiz => {
      return (
        <div className="list-item" key={quiz._id}>
          <div className="title">{quiz.title}</div>
          <div className="description">{quiz.description}</div>
          <div className="info">
            <Link to={`/home/quiz/${quiz._id}`}>
              <Button variant="contained" color="secondary">Pass</Button>
            </Link>
          </div>
        </div>
      );
    });

    return <Paper className="content">{quizListNode}</Paper>;
  }
}