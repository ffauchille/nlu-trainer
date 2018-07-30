import * as React from "react";
import { Provider } from "react-redux";
import { routerMiddleware, connectRouter, ConnectedRouter, push } from "connected-react-router";
import { createStore, combineReducers, applyMiddleware } from "redux";
import reducers from "./reducers";
import { Route, Redirect, Switch } from "react-router";
import { createBrowserHistory, History } from "history";
import { createEpicMiddleware } from "redux-observable";
import { composeWithDevTools } from "redux-devtools-extension";
import epics from "./epics";
import Apps from "./apps/apps";
import Intents from "./intents/intents";
import Examples from "./examples/examples";
import Layout from "./layout";

import "../semantic/dist/semantic.min.css"
import "./app.css"

const epicMiddleware = createEpicMiddleware();
const history: History = createBrowserHistory();

let middlewares = applyMiddleware(epicMiddleware, routerMiddleware(history))
let tools = process.env.MODE === 'dev' ? composeWithDevTools(middlewares) : middlewares

const store = createStore(
  connectRouter(history)(combineReducers(reducers)),
  tools
);

epicMiddleware.run(epics);


export class App extends React.Component<any, {}> {
  render() {
    console.log("rendering App");
    return (
      <Provider store={store}>
        <Layout>
          <ConnectedRouter history={history}>
            <Switch>
              <Route path="/:appId/:intentName" component={Examples} />
              <Route path="/:appId" component={Intents} />
              <Route path="/" component={Apps} />
              <Redirect push to="/" />
            </Switch>
          </ConnectedRouter>
        </Layout>
      </Provider>
    );
  }
}
