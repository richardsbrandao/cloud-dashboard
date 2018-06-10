import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from '../Reducers'

const storeWithMiddlewares = applyMiddleware(thunk)(createStore)

function configureStore(initialState) {
    return storeWithMiddlewares(reducers, initialState)
}

export { configureStore }