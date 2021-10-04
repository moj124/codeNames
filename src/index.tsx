import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Home } from "./component/Home";
import "./css/App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route, useParams} from "react-router-dom";
ReactDOM.render(
  <React.StrictMode>
    <Router>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/:session">
            <StartApp/>
          </Route>
        </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

function StartApp(){
  const {session} = useParams<{session: string}>();

  return(
    <App session={session}/>
  );
}
