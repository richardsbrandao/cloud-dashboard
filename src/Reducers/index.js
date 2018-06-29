import { combineReducers } from 'redux'
import Ec2Reducer from './Ec2Reducer'
import RdsReducer from './RdsReducer'

const reducers = combineReducers({
    Ec2Reducer,
    RdsReducer
})

export default reducers