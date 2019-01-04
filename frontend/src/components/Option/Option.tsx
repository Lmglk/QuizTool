import * as React from 'react';
import { Checkbox } from '@material-ui/core';

import './Option.css';

interface IOptionProps {
    title: string;
    status: string;
    checked: boolean;
    value: boolean;
    turnAnswer: any;
}

export const QuestOption = (props: IOptionProps) => (
    <div className={`option ${props.status}`}>
        <Checkbox color="primary" value={props.title} disabled={props.checked} checked={props.value} onChange={props.turnAnswer} />
        <span className="title">{props.title}</span>
    </div>
);
