import React from 'react';
import ReactDOM from 'react-dom';
import Router from './components/router/router';
import { createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { rootReducer } from './reducers/redusers';

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Router />
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
