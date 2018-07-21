import * as React from 'react';
import {Component} from 'react';

import {TestList} from '../TestList/TestList';

import "./Page.css";
import {Route, Switch} from "react-router";
import {Content} from "../Content/Content";

export class Page extends Component {
  public render() {
    return (
      <div className="page">
        <div className="title">
          <h2>Test</h2>
        </div>
        <Switch>
          <Route exact={true} path={`/home`} component={TestList}/>
          <Route path={`/home/test`} component={Content}/>
        </Switch>
      </div>
    )
  }
}
