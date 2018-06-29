import * as React from 'react';
import {Component} from 'react';

import {Content} from "../Content/Content";

import "./Page.css";

export class Page extends Component {
  public render() {
    return (
      <div className="page">
        <div className="title">
          <h2>Test</h2>
        </div>
        <Content/>
      </div>
    )
  }
}