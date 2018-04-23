import * as React from "react";

import "./Quest.sass";

export interface Quest {
    question: string
    options: Array<string>,
}

function Quest(props: Quest) {
    let options: Array<Object> = [];

    props.options.forEach(option => {
        options.push(
            <div className="quest-option" key={`option-for-quest-${option}`}>
                <input type="checkbox" key={`input-${option}`}/>
                <label key={`label-${option}`}>{option}</label>
            </div>
        );
    });

    return (
        <div className="quest">
            <div className="quest-title">{props.question}</div>
            <div className="quest-options">
                {options}
            </div>
        </div>
    );
}

export default Quest;
