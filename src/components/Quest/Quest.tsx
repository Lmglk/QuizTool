import * as React from 'react';
import {IOption, IQuestion} from "../Content/Content";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";

import "./Quest.css";
import {Component, ReactNode} from "react";

interface IQuestProps {
  index: number
  checked: boolean;
  turnAnswer: any;
  question: IQuestion;
}

export class Quest extends Component<IQuestProps, any> {

  private static getCheckClass(value: boolean, answer: boolean): string {
    let className: string = "";
    if (answer) {
      className = "valid"
    } else if (value && !answer) {
      className = "invalid"
    }
    return className;
  }

  private options: ReactNode;

  public render(): ReactNode {
    this.options = this.generateHTMLOptions();
    return (
      <div className="quest">
        <div className="quest-title">{this.props.index}. {this.props.question.title}</div>
        <div className="quest-options">{this.options}</div>
      </div>
    )
  }

  private generateHTMLOptions(): ReactNode {
    return (
      <FormGroup>
        {
          this.props.question.options.map((option: IOption, index: number) => {
            let className: string = "";
            if (this.props.checked) {
              className = Quest.getCheckClass(option.value, option.answer);
            }

            return (
              <div className={`option ${className}`} key={index}>
                <Checkbox color="primary" value={option.title} disabled={this.props.checked} checked={option.value}
                          onChange={this.props.turnAnswer} />
                <span className="title">{option.title}</span>
              </div>
            )
          })
        }
      </FormGroup>
    )
  }
}