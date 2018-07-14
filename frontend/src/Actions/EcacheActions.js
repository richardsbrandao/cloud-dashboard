import { Actions } from '../Config/constants'
import { api } from '../Config';
import 'whatwg-fetch'
import ReportService from '../Services/ReportService';

function ecacheFetchDataMode(loading) {
    return {
        type: Actions.ECACHE_LOADING,
        loading
    }
}

// function ecacheFetchDataError(error) {
//     return {
//         type: Actions.ECACHE_ERROR,
//         error
//     }
// }

function ecacheFetchDataSuccess(dashboard, by) {
    return {
        type: Actions.ECACHE_DASHBOARD,
        dashboard,
        by
    }
}

function fetchEcacheDashboard(by, params) {
    return (dispatch) => {
        dispatch(ecacheFetchDataMode(true));

        fetch(`${api.endpoint}/elasticache${query(params)}`)
            .then(response => {
                dispatch(ecacheFetchDataMode(false));
                return response.json();
            })
            .then(json => {
                return new ReportService(json).by(by); 
            })
            .then(dashboard => dispatch(ecacheFetchDataSuccess(dashboard, by)));
    }
}

function query(params) {
    return params ? `?startDate=${params['startDate']}&endDate${params['endDate']}` : '';
}

export { fetchEcacheDashboard };