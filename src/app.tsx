import * as React from "react";
import { Provider } from "react-redux";
import { routerMiddleware } from "react-router-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import reducers, { StoreState } from "./reducers";
import { Router, Route, Redirect, Switch } from "react-router";
import { createBrowserHistory, History } from "history";
import { createEpicMiddleware } from "redux-observable";
import { composeWithDevTools } from "redux-devtools-extension";
import epics from "./epics";
import Apps from "./apps/apps";
import Intents from "./intents/intents";
import Layout from "./layout";

import "../semantic/dist/semantic.min.css"
import "./app.css"

const epicMiddleware = createEpicMiddleware();
const history: History = createBrowserHistory();

const store = createStore(
  combineReducers<StoreState>(reducers),
  composeWithDevTools(applyMiddleware(epicMiddleware, routerMiddleware(history)))
);

epicMiddleware.run(epics);


export class App extends React.Component<any, {}> {

  render() {
    return (
      <Provider store={store}>
        <Layout>
          <Router history={history}>
            <Switch>
              <Route path="/apps/:appId" component={Intents} />
              <Route exact path="/apps" component={Apps} />
              <Redirect to="/apps" />
            </Switch>
          </Router>
        </Layout>
      </Provider>
    );
  }
}
