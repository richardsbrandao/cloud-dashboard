import { Actions } from '../Config/constants';

function handleAction(state, action) {
    switch (action.type) {
        case Actions.ECACHE_DASHBOARD:
            return { dashboard: action.dashboard, filter: action.by }
        case Actions.ECACHE_LOADING:
            return { loading: action.loading }
        default:
            return state;
    }
}

export default (state = {}, action) => {
    return Object.assign({}, state, handleAction(state, action));
}