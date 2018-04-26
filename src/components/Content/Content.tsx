import * as React from "react";
import {Component, ReactNode} from "react";

import Quest from "../Quest/Quest";

import "./Content.sass";

import {data, answers} from "./data";

export interface IOption {
    title: string,
    value: boolean,
    answer: boolean
}

interface IQuestion {
    id: number;
    title: string;
    accept: boolean;
    options: Array<IOption>;
}

interface IContentState {
    questions: Array<IQuestion>;
}

export class Content extends Component<any, IContentState> {
    private countAcceptQuestions: number;

    constructor(props: any) {
        super(props);

        let questions: Array<IQuestion> = [];
        data.forEach(quest => {
            let options: Array<IOption> = [];
            quest.options.forEach(option => {
                options.push({
                    title: option,
                    value: false,
                    answer: false
                });
            });
            questions.push({
                id: quest.id,
                title: quest.title,
                accept: false,
                options: options
            });

        });
        this.countAcceptQuestions = 0;
        this.state = {
            questions: questions
        };
    }

    private turnAnswer(index: number, event: any): void {
        const newState: Array<IQuestion> = this.state.questions;
        let option: IOption = newState[index].options.find(option => option.title === event.target.value);
        option.value = event.target.checked;
        this.setState({
            questions: newState
        });
    }

    private checkAnswer(): void {
        this.countAcceptQuestions = 0;
        const newState: Array<IQuestion> = this.state.questions;
        newState.forEach((quest, index) => {
            let accept = true;
            quest.options.forEach(option => {
                answers[index].answer.forEach(answer => option.answer = answer === option.title);
                if (option.value !== option.answer)
                    accept = false;
            });
            quest.accept = accept;
            if (quest.accept)
                this.countAcceptQuestions++;
        });

        this.setState({
            questions: newState
        });
    }

    render(): ReactNode {
        let questionsNode: Array<React.ReactNode> =
            this.state.questions.map((quest, index) =>
                <Quest key={quest.id} question={quest} turnAnswer={this.turnAnswer.bind(this, index)}/>
            );

        return (
            <div className="container app-body">
                <div className="row">
                    <button className="btn btn-default" onClick={this.checkAnswer.bind(this)}>Проверить</button>
                    <span>Правильно отвечено: {this.countAcceptQuestions} из {this.state.questions.length}</span>
                    <div className="col-12">{questionsNode}</div>
                </div>
            </div>
        );
    }
}