import * as React from "react";
import {Fragment} from "react";
import * as ReactDOM from "react-dom";

import {Header} from "./components/Header/Header";
import {Content} from "./components/Content/Content";

ReactDOM.render(
    <Fragment>
        <Header/>
        <Content/>
    </Fragment>,
    document.getElementById("app")
);