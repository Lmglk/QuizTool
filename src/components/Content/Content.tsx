import * as React from "react";
import {Component, ReactNode} from "react";

import {Quest} from "../Quest/Quest";

import "./Content.sass";

import {data} from "./data";

export class Content extends Component {
    private questions: Array<ReactNode> = [];

    constructor(props: any) {
        super(props);

        data.forEach(question => {
            this.questions.push(
                <Quest question={question.question} options={question.options} key={`quest-${question.id}`}/>
            );
        });
    }

    render(): ReactNode {
        return (
            <div className="container app-body">
                <div className="row">
                    <div className="col-12">
                        {this.questions}
                    </div>
                </div>
            </div>
        );
    }
}