import { Actions } from '../Config/constants'
import { api } from '../Config';
import 'whatwg-fetch'
import ReportService from '../Services/ReportService';

function rdsFetchDataMode(loading) {
    return {
        type: Actions.RDS_LOADING,
        loading
    }
}

// function rdsFetchDataError(error) {
//     return {
//         type: Actions.RDS_ERROR,
//         error
//     }
// }

function rdsFetchDataSuccess(dashboard, by) {
    return {
        type: Actions.RDS_DASHBOARD,
        dashboard,
        by
    }
}

function fetchRdsDashboard(by, params) {
    return (dispatch) => {
        dispatch(rdsFetchDataMode(true));
        if(!params) {
            fetchCurrentRdsDashboard(dispatch, by);
        } else {
            fetchRdsHistoryDashboard(dispatch, by, params);
        }
    }
}

function fetchRdsHistoryDashboard(dispatch, by, params) {
    fetch(`${api.endpoint}/histories${query(params)}`)
            .then(response => {
                dispatch(rdsFetchDataMode(false));
                return response.json();
            })
            .then(histories => {
                return histories.map(history => new ReportService(JSON.parse(history.state), history.time).by(by)); 
            })
            .then(dashboard => dispatch(rdsFetchDataSuccess(dashboard, by)));
}

function fetchCurrentRdsDashboard(dispatch, by) {
    fetch(`${api.endpoint}/rds`)
            .then(response => {
                dispatch(rdsFetchDataMode(false));
                return response.json();
            })
            .then(histories => {
                return histories.map(history => new ReportService(history.state, history.time).by(by)); 
            })
            .then(dashboard => dispatch(rdsFetchDataSuccess(dashboard, by)));
}

function query(params) {
    return params ? `?resource=RDS&startDate=${params['startDate']}&endDate=${params['endDate']}` : '';
}

export { fetchRdsDashboard };