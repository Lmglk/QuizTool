import * as React from "react";
import {Component} from "react";
import {Link} from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import {testsList} from "../../mocks/tests";

import "./TestList.css";
import Button from "@material-ui/core/Button";
import {ITest} from "../../types/test";

interface ITestListState {
  testList: ITest[];
}

export class TestList extends Component<any, ITestListState> {
  public readonly state: ITestListState;

  constructor(props: any) {
    super(props);

    this.state = {
      testList: testsList
    }
  }

  public render() {
    const testListNode = this.state.testList.map(test => {
      return (
        <div className="list-item" key={test.id}>
          <div className="title">{test.title}</div>
          <div className="description">{test.description}</div>
          <div className="info">
            <Link to="/home/test">
              <Button variant="contained" color="secondary">Pass</Button>
            </Link>
          </div>
        </div>
      );
    });

    return <Paper className="content">{testListNode}</Paper>;
  }
}
