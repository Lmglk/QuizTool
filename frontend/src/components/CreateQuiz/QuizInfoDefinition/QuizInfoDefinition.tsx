import * as React from "react";
import {Fragment} from "react";

import './QuizInfoDefinition.css';

const QuizInfoDefinition = (props: any) => {
  return (
    <Fragment>
      <div className="item">
        <div className="title-item">Quiz name:</div>
        <input value={props.title} onChange={props.changeHandler('title')}/>
      </div>
      <div className="item">
        <div className="title-item">Quiz description</div>
        <textarea rows={5} value={props.description}
                  onChange={props.changeHandler('description')}/>
      </div>
    </Fragment>
  );
};

export default QuizInfoDefinition