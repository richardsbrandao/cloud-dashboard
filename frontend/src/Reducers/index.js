import { combineReducers } from 'redux'
import Ec2Reducer from './Ec2Reducer'
import RdsReducer from './RdsReducer'
import EcacheReducer from './EcacheReducer'

const reducers = combineReducers({
    Ec2Reducer,
    RdsReducer,
    EcacheReducer
})

export default reducers