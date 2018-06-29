import { Actions } from '../Config/constants';

function handleAction(state, action) {
    switch (action.type) {
        case Actions.RDS_DASHBOARD:
            return { dashboard: action.dashboard, filter: action.by }
        case Actions.RDS_LOADING:
            return { loading: action.loading }
        default:
            return state;
    }
}

export default (state = {}, action) => {
    return Object.assign({}, state, handleAction(state, action));
}