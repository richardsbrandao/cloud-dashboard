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
        if(!params) {
            fetchCurrentEcacheDashboard(dispatch, by);
        } else {
            fetchEcacheHistoryDashboard(dispatch, by, params);
        }
    }
}

function fetchEcacheHistoryDashboard(dispatch, by, params) {
    fetch(`${api.endpoint}/histories${query(params)}`)
            .then(response => {
                dispatch(ecacheFetchDataMode(false));
                return response.json();
            })
            .then(histories => {
                return histories.map(history => new ReportService(JSON.parse(history.state), history.time).by(by)); 
            })
            .then(dashboard => dispatch(ecacheFetchDataSuccess(dashboard, by)));
}

function fetchCurrentEcacheDashboard(dispatch, by) {
    fetch(`${api.endpoint}/elasticache`)
            .then(response => {
                dispatch(ecacheFetchDataMode(false));
                return response.json();
            })
            .then(histories => {
                console.log(histories, "<<<")
                return histories.map(history => new ReportService(history.state, history.time).by(by)); 
            })
            .then(dashboard => dispatch(ecacheFetchDataSuccess(dashboard, by)));
}

function query(params) {
    return params ? `?resource=ECACHE&startDate=${params['startDate']}&endDate=${params['endDate']}` : '';
}

export { fetchEcacheDashboard };