import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import Board from 'containers/Board';
import { compose, createStore } from 'redux';
import appReducer from 'containers/Board/reducers';

import './styles.scss';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(appReducer, composeEnhancers());

ReactDOM.render(
    <Provider store={store}>
        <Board />
    </Provider>,
    document.getElementById('app')
);
