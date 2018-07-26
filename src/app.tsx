import * as React from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import reducers, { StoreState } from "./reducers";
import { Router, Route, Redirect, Switch } from "react-router";
import { createBrowserHistory, History } from "history";
import { createEpicMiddleware } from "redux-observable";
import epics from "./epics";
import Apps from "./apps/apps";
import Layout from "./layout";

import "../semantic/dist/semantic.min.css"

const epicMiddleware = createEpicMiddleware();
const store = createStore(
  combineReducers<StoreState>(reducers),
  applyMiddleware(epicMiddleware)
);

epicMiddleware.run(epics);

const history: History = createBrowserHistory();

export class App extends React.Component<any, {}> {
  render() {
    return (
      <Provider store={store}>
        <Layout>
          <Router history={history}>
            <Switch>
              <Route path="/apps/:appId" component={Apps} />
              <Route exact path="/apps" component={Apps} />
              <Redirect to="/apps" />
            </Switch>
          </Router>
        </Layout>
      </Provider>
    );
  }
}
