import * as React from 'react';
import {Component} from 'react';

import {QuizList} from '../QuizList/QuizList';

import "./Page.css";
import {Route, Switch} from "react-router";
import {Quiz} from "../Quiz/Quiz";

export class Page extends Component {
  public render() {
    return (
      <div className="page">
        <div className="title">
          <h2>Test</h2>
        </div>
        <Switch>
          <Route exact={true} path={`/home`} component={QuizList}/>
          <Route path={`/home/quiz/:id`} component={Quiz}/>
        </Switch>
      </div>
    )
  }
}
