import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import App from './App';

import { Provider } from 'react-redux';
import { configureStore } from './Store'

const initialState = {
    Ec2Reducer: {
        instances: [],
        dashboard: [],
        filter: 'Type'
    }
};

const store = configureStore(initialState);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
