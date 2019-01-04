import * as React from 'react';
import { Component } from 'react';
import Button from '@material-ui/core/Button';
import { IQuiz } from '../../types/quiz';
import { Card, CardActions, CardContent, CardHeader } from '@material-ui/core';
import App from '../App/App';

import './QuizList.css';
import { config } from '../../config/app.config';

interface IQuizListState {
    quizList: IQuiz[];
}

export class QuizList extends Component<any, IQuizListState> {
    private static parseDataOption = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    };

    private static async getQuizList() {
        try {
            const response = await fetch(`${config.SERVER_API}/quiz/getAll`);
            return await response.json();
        } catch (e) {
            console.error('Loading list of quiz - FAIL');
        }
    }

    public readonly state: IQuizListState = {
        quizList: [],
    };

    public async componentDidMount() {
        this.setState({ quizList: await QuizList.getQuizList() });
    }

    public render() {
        const quizListNode = this.renderListNodeTest();

        return <div>{quizListNode}</div>;
    }

    private renderListNodeTest() {
        return this.state.quizList.map(quiz => (
            <Card className="list-item" key={quiz._id}>
                <CardHeader title={quiz.title} subheader={quiz.author_id} />
                <CardContent>
                    <div>{quiz.description}</div>
                </CardContent>
                <CardActions className="list-item__actions">
                    <div className="date">Created at: {new Date(quiz.updatedAt!).toLocaleString('en', QuizList.parseDataOption)}</div>
                    <div className="button-container">
                        {this.renderRemoveButton(quiz.author_id, quiz._id!)}
                        <Button color="secondary" onClick={this.passQuiz(quiz._id as string)}>
                            Pass
                        </Button>
                    </div>
                </CardActions>
            </Card>
        ));
    }

    private renderRemoveButton(authorId: string, quizId: string) {
        return authorId === App.userId ? (
            <Button className="remove-btn" onClick={this.removeQuiz(quizId)}>
                Remove
            </Button>
        ) : null;
    }

    private passQuiz = (quizId: string) => () => {
        this.props.history.push(`/quiz/${quizId}`);
    };

    private removeQuiz = (quizId: string) => async () => {
        const res = await fetch(`${config.SERVER_API}/quiz/removeQuiz/${quizId}`);
        if (res.status !== 200) {
            console.error('Removing quiz - FAIL');
        }
        this.setState({ quizList: await QuizList.getQuizList() });
    };
}
