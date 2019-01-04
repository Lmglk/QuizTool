import * as React from 'react';
import FormGroup from '@material-ui/core/FormGroup';

import './Quest.css';
import { Component, ReactNode } from 'react';
import { IOption } from '../../types/option';
import { IQuestion } from '../../types/question';
import { QuestOption } from '../Option/Option';

interface IQuestProps {
    index: number;
    checked: boolean;
    turnAnswer: any;
    question: IQuestion;
}

export class Quest extends Component<IQuestProps, any> {
    private static getCheckClass(value: boolean, answer: boolean): string {
        let className: string = '';
        if (answer) {
            className = 'valid';
        } else if (value) {
            className = 'invalid';
        }
        return className;
    }

    public render(): ReactNode {
        return (
            <div className="quest">
                <div className="quest-title">
                    {this.props.index}. {this.props.question.title}
                </div>
                <div className="quest-options">
                    <FormGroup>
                        {this.props.question.options.map((option: IOption, index: number) => (
                            <QuestOption
                                key={index}
                                title={option.title}
                                status={this.props.checked ? Quest.getCheckClass(option.value, option.answer) : ''}
                                checked={this.props.checked}
                                value={option.value}
                                turnAnswer={this.props.turnAnswer}
                            />
                        ))}
                    </FormGroup>
                </div>
            </div>
        );
    }
}
