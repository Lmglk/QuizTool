import * as React from "react";
import {Component, ReactNode} from "react";

import "./Header.sass";

export class Header extends Component {
    render(): ReactNode {
        return (
            <div className="navbar app-header">
                <a className="logo" href="#">QuizTool</a>
            </div>
        );
    }
}