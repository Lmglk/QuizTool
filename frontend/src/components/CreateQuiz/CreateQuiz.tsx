import { Component } from 'react';
import * as React from 'react';
import Paper from '@material-ui/core/Paper/Paper';

import './CreateQuiz.css';
import Stepper from '@material-ui/core/Stepper/Stepper';
import Step from '@material-ui/core/Step/Step';
import StepButton from '@material-ui/core/StepButton/StepButton';
import Button from '@material-ui/core/Button/Button';
import { IQuiz } from '../../types/quiz';
import App from '../App/App';
import { IQuestion } from '../../types/question';
import { IOption } from '../../types/option';
import QuizInfoDefinition from './QuizInfoDefinition/QuizInfoDefinition';
import QuestListDefinition from './QuestListDefinition/QuestListDefinition';
import { config } from '../../config/app.config';

interface ICreateQuizState {
    activeStep: number;
    commonInfo: IQuiz;
    questions: IQuestion[];
}

export class CreateQuiz extends Component<any, ICreateQuizState> {
    public static questionId = 1;
    public static optionId = 1;

    public state = {
        activeStep: 0,
        commonInfo: {
            author_id: App.userId,
            title: '',
            description: '',
        },
        questions: [
            {
                id: CreateQuiz.questionId++,
                title: 'Title of question',
                options: [
                    {
                        id: CreateQuiz.optionId++,
                        title: 'Option',
                        value: false,
                        answer: false,
                    },
                ],
            },
        ],
    };

    public render() {
        const steps = ['Common information', 'Questions', 'Options'];
        const { activeStep } = this.state;

        return (
            <Paper className="content">
                <Stepper nonLinear={true} activeStep={activeStep}>
                    {steps.map((title, index) => (
                        <Step key={title}>
                            <StepButton onClick={this.changeStep(index, '')}>{title}</StepButton>
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
                        <QuizInfoDefinition title={commonInfo.title} changeHandler={this.changeHandler} />
                        <div className="actions">
                            <Button className="action-btn" variant="contained" color="secondary" onClick={this.changeStep(step, 'next')}>
                                Next
                            </Button>
                        </div>
                    </div>
                );
            case 1:
                return (
                    <div className="input-items">
                        <QuestListDefinition
                            questions={questions}
                            changeQuestionName={this.changeQuestionName}
                            addOption={this.addOption}
                            deleteQuestion={this.deleteQuestion}
                            changeOptionName={this.changeOptionName}
                            markAsAnswer={this.markAsAnswer}
                            deleteOption={this.deleteOption}
                        />

                        <div className="actions">
                            <Button className="action-btn" variant="contained" color="secondary" onClick={this.addQuestion}>
                                Add question
                            </Button>
                            <Button className="action-btn" variant="contained" color="secondary" onClick={this.changeStep(step, 'back')}>
                                Back
                            </Button>
                            <Button className="action-btn" variant="contained" color="secondary" onClick={this.changeStep(step, 'next')}>
                                Next
                            </Button>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="input-items">
                        <div className="actions">
                            <Button className="action-btn" variant="contained" color="secondary" onClick={this.changeStep(step, 'back')}>
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

    private changeHandler = (name: string) => (event: any) => {
        this.setState({
            commonInfo: {
                ...this.state.commonInfo,
                [name]: event.target.value,
            },
        } as ICreateQuizState);
    };

    private addQuestion = () => {
        this.setState({
            questions: [
                ...this.state.questions,
                {
                    id: CreateQuiz.questionId++,
                    title: 'Title of question',
                    options: [
                        {
                            id: CreateQuiz.optionId++,
                            title: 'Option',
                            value: false,
                            answer: false,
                        },
                    ] as IOption[],
                },
            ],
        });
    };

    private addOption = (question: IQuestion) => () => {
        const { questions } = this.state;
        const currQuestion: any = questions.find(item => item === question);
        currQuestion.options = [
            ...currQuestion.options,
            {
                id: CreateQuiz.optionId++,
                title: 'Option',
                value: false,
                answer: false,
            },
        ];
        this.setState({ questions });
    };

    private deleteQuestion = (question: IQuestion) => (event: any) => {
        event.stopPropagation();
        const { questions } = this.state;
        this.setState({
            questions: questions.filter(item => item !== question),
        });
    };

    private changeQuestionName = (question: IQuestion) => (event: any) => {
        const { questions } = this.state;
        const currQuestion: any = questions.find(item => item.id === question.id);
        currQuestion.title = event.target.value;
        this.setState({ questions });
    };

    private deleteOption = (option: IOption, questionId: number) => () => {
        const { questions } = this.state;
        const currQuestion: any = questions.find(item => item.id === questionId);
        currQuestion.options = currQuestion.options.filter((item: IOption) => item.id !== option.id);
        this.setState({ questions });
    };

    private changeOptionName = (option: IOption, QuestionId: number) => (event: any) => {
        const { questions } = this.state;
        const currQuestion: any = questions.find(item => item.id === QuestionId);
        const currOption = currQuestion.options.find((item: IOption) => item === option);
        currOption.title = event.target.value;
        this.setState({ questions });
    };

    private markAsAnswer = (option: IOption, questionId: number) => (event: any) => {
        const { questions } = this.state;
        const currQuestion: any = questions.find(item => item.id === questionId);
        const currOption = currQuestion.options.find((item: IOption) => item === option);
        currOption.answer = event.target.checked;
        this.setState({ questions });
    };

    private changeStep = (step: number, direction: string) => () => {
        switch (direction) {
            case 'next':
                step++;
                break;
            case 'back':
                step--;
                break;
        }
        this.setState({ activeStep: step });
    };

    private saveQuiz = async () => {
        const questions = this.state.questions.map(question => {
            let answers: string[] = [];
            return {
                ...question,
                options: question.options.map(option => {
                    if (option.answer) {
                        answers = [...answers, option.title];
                    }
                    return option.title;
                }),
                answers,
            };
        });

        const quiz = { ...this.state.commonInfo, questions };
        console.log(quiz);

        const res = await fetch(`${config.SERVER_API}/quiz/addTest`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(quiz),
        });

        if (res.status === 200) {
            this.props.history.push('home');
        } else {
            console.error('Saving quiz - FAIL');
        }
    };
}
