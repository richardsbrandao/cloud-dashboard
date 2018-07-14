import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import App from './Layout/App';

import { Provider } from 'react-redux';
import { configureStore } from './Store'

const initialState = {
    Ec2Reducer: {
        dashboard: [],
        filter: 'Type'
    },
    RdsReducer: {
        dashboard: [],
        filter: 'DBInstanceClass'
    },
    EcacheReducer: {
        dashboard: [],
        filter: 'Engine'
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
