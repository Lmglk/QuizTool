import * as React from "react";
import {ReactNode} from "react";

import "./Quest.sass";
import {IOption} from "../Content/Content";

function Quest(props: any) {
    let options: Array<ReactNode> = props.question.options
        .map((option: IOption, index: number) => {
            let className: string = option.answer ? " valid" : "";
            return (
                <div className={"quest-option" + className} key={`option-${index}`}>
                    <input type="checkbox" value={option.title} key={`input-${index}`} onChange={props.turnAnswer}/>
                    <label key={`label-${index}`}>{option.title}</label>
                </div>
            );
        });

    return (
        <div className="quest">
            <div className="quest-title">{props.question.title}</div>
            <div className="quest-options">{options}</div>
        </div>
    );
}

export default Quest;