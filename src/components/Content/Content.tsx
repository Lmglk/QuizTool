import * as React from "react";
import {Component, ReactNode} from "react";

import Quest from "../Quest/Quest";

import "./Content.sass";

import {data, answers} from "./data";

export interface IOption {
    title: string,
    value: boolean
}

interface IQuestion {
    id: number;
    title: string;
    options: Array<IOption>;
}

interface IContentState {
    questions: Array<IQuestion>;
}

export class Content extends Component<any, IContentState> {
    private questions: Array<IQuestion>;

    constructor(props: any) {
        super(props);

        this.questions = [];
        data.forEach(quest => {
            let options: Array<IOption> = [];
            quest.options.forEach(option => {
                options.push({
                  title: option,
                  value: false
                });
            });
            this.questions.push({
                id: quest.id,
                title: quest.title,
                options: options
            });

            this.state = {
                questions: this.questions
            }
        });
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
        this.state.questions.forEach((quest, index) => {
            let right = true;
            quest.options.forEach(option => {
                answers[index].answer.forEach(answer => {
                    if ((answer === option.title && !option.value) || (answer !== option.title && option.value))
                        right = false;
                })
            });
            console.log(quest.title, " - ", right);
        });
    }

    render(): ReactNode {
        let questionsNode: Array<React.ReactNode> =
            this.questions.map((quest, index) =>
                <Quest key={quest.id} question={quest} turnAnswer={this.turnAnswer.bind(this, index)}/>
            );

        return (
            <div className="container app-body">
                <div className="row">
                    <button className="btn btn-default" onClick={this.checkAnswer.bind(this)}>Проверить</button>
                    <div className="col-12">{questionsNode}</div>
                </div>
            </div>
        );
    }
}