import * as React from 'react'
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import * as reducers from './reducers'
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';

const store = createStore(
    combineReducers(reducers)
)

const history = createBrowserHistory()

export class App extends React.Component<any, {}> {
    render() {
        return (
        <Provider store={store}>
            <Router history={history}>
            </Router>
            
        </Provider>)
    }
}
