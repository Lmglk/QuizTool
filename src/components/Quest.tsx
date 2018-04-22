import * as React from "react";

export interface Quest {
    question: string
    options: Array<string>,
}

function Quest(props: Quest) {
    let options: Array<Object> = [];

    props.options.forEach(option => {
        options.push(<li key={option}>{option}</li>);
    });

    return (
        <div>
            <div>{props.question}</div>
            <ul>{options}</ul>
        </div>
    );

}
export default Quest;
