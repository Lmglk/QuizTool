import * as React from "react";
import {Component, ReactNode} from "react";
import {Header} from "../Header/Header";
import {Sidebar} from "../Sidebar/Sidebar";
import {Page} from "../Page/Page";

import "./Home.css";

export class Home extends Component {

  public render(): ReactNode {
    return (
      <div className="home-page">
        <Header/>
        <Sidebar/>
        <Page/>
      </div>
    );
  }
}