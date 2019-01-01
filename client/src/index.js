/**************************
 * Import important stuff *
 **************************/

import "bootstrap";
import "./style/index.scss";

import React from "react";
import { render } from "react-dom";
import { Router } from "./ui/components/router";

/****************************************
 * Start the app by mounting the router *
 ****************************************/

render(<Router />, document.getElementById("react-root"));
