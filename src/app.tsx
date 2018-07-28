import * as React from "react";
import { Provider } from "react-redux";
import { routerMiddleware, connectRouter, ConnectedRouter, push } from "connected-react-router";
import { createStore, combineReducers, applyMiddleware } from "redux";
import reducers, { StoreState } from "./reducers";
import { Route, Redirect, Switch } from "react-router";
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

let middlewares = applyMiddleware(epicMiddleware, routerMiddleware(history))
let tools = process.env.MODE === 'dev' ? composeWithDevTools(middlewares) : middlewares

const store = createStore(
  connectRouter(history)(combineReducers(reducers)),
  tools
);

epicMiddleware.run(epics);

/** Handling hand written URLs */
history.listen((location, action) => {
  const toRgx = (li: string[]) => li.length > 0 ? `(/(${li.join("|")}))?` : ""
  let curState: StoreState = store.getState()
  
  if ( curState && curState.apps && curState.intents) {
    let appsRgx: string = toRgx(curState.apps.all.map(a => a.name))
    let intentRgx: string = toRgx(curState.intents.all.map(i => i.name))
    let validUrl: RegExp = RegExp(`/apps${appsRgx}${intentRgx}`)
    if (!location.pathname.match(validUrl)) {
      console.log("invalid URL location, ", location.pathname)
      store.dispatch(push("/apps"))
    }
  }
});



export class App extends React.Component<any, {}> {

  componentWillMount() {
    if (!store.getState().apps.selected) {
      store.dispatch(push("/apps"))
    }
  }
  render() {
    return (
      <Provider store={store}>
        <Layout>
          <ConnectedRouter history={history}>
            <Switch>
              <Route exact path="/apps" component={Apps} />
              <Route path="/apps/:appId" component={Intents} />
              <Route component={Apps} />
            </Switch>
          </ConnectedRouter>
        </Layout>
      </Provider>
    );
  }
}
