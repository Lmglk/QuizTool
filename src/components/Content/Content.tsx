import * as React from "react";
import {ReactNode} from "react";

import Quest from "../Quest/Quest";

import "./Content.sass";

import {data} from "./data";

function Content() {
    let questions: Array<ReactNode> = [];
    data.forEach(question => {
        questions.push(
            <Quest question={question.question} options={question.options} key={`quest-${question.id}`}/>
        );
    });

    return (
        <div className="container app-body">
            <div className="row">
                <div className="col-12">
                    {questions}
                </div>
            </div>
        </div>
    );
}

export default Content;