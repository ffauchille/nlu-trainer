import * as React from 'react'
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import reducers, { StoreState } from './reducers'
import { Router } from 'react-router';
import { createBrowserHistory, History } from 'history';
import { createEpicMiddleware } from 'redux-observable';
import epics from "./epics"

const store = createStore(
    combineReducers<StoreState>(reducers),
    applyMiddleware(createEpicMiddleware(epics))
)

const history: History = createBrowserHistory()

export class App extends React.Component<any, {}> {
    render() {
        return (
        <Provider store={store}>
            <Router history={history}>
            </Router>
        </Provider>
        )
    }
}
