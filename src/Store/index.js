import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducers from '../Reducers'

const logger = createLogger({collapsed:true})
const storeWithMiddlewares = applyMiddleware(thunk,logger)(createStore)

function configureStore(initialState) {
    return storeWithMiddlewares(reducers, initialState)
}

export { configureStore }