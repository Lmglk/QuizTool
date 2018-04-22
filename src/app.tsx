import * as React from "react";
import * as ReactDOM from "react-dom";
import {Fragment, ReactNode} from "react";

import Quest from "./components/Quest";

import {data} from "./data";

let questions: Array<ReactNode> = [];
data.forEach(question => {
    questions.push(
        <Quest key={question.id} question={question.question} options={question.options}/>
    );
});

ReactDOM.render(
    <Fragment>{questions}</Fragment>,
    document.getElementById("app")
);
