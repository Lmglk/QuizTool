import * as React from "react";
import {Component, ReactNode} from "react";

import "./Quest.sass";

export interface IQuest {
    question: string
    options: Array<string>,
}

export class Quest extends Component<IQuest> {
    private options: Array<Object> = [];
    private question: any;


    constructor(props: IQuest) {
        super(props);

        this.question = props.question;

        props.options.forEach((option: any) => {
            this.options.push(
                <div className="quest-option" key={`option-for-quest-${option}`}>
                    <input type="checkbox" key={`input-${option}`}
                           value={option}/>
                    <label key={`label-${option}`}>{option}</label>
                </div>
            );
        });
    }

    render(): ReactNode {
        return (
            <div className="quest">
                <div className="quest-title">{this.question}</div>
                <div className="quest-options">
                    {this.options}
                </div>
            </div>
        );
    }
}