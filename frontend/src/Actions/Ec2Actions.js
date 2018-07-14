import { Actions } from '../Config/constants'
import { api } from '../Config';
import 'whatwg-fetch'
import ReportService from '../Services/ReportService';

function ec2FetchDataMode(loading) {
    return {
        type: Actions.EC2_LOADING,
        loading
    }
}

// function ec2FetchDataError(error) {
//     return {
//         type: Actions.EC2_ERROR,
//         error
//     }
// }

function ec2FetchDataSuccess(dashboard, by) {
    return {
        type: Actions.EC2_DASHBOARD,
        dashboard,
        by
    }
}

function fetchEc2Dashboard(by, params) {
    return (dispatch) => {
        dispatch(ec2FetchDataMode(true));
        if(!params) {
            fetchCurrentEc2Dashboard(dispatch, by);
        } else {
            fetchEc2HistoryDashboard(dispatch, by, params);
        }
    }
}

function fetchEc2HistoryDashboard(dispatch, by, params) {
    fetch(`${api.endpoint}/histories${query(params)}`)
            .then(response => {
                dispatch(ec2FetchDataMode(false));
                return response.json();
            })
            .then(histories => {
                return histories.map(history => new ReportService(JSON.parse(history.state), history.time).by(by)); 
            })
            .then(dashboard => dispatch(ec2FetchDataSuccess(dashboard, by)));
}

function fetchCurrentEc2Dashboard(dispatch, by) {
    fetch(`${api.endpoint}/ec2`)
            .then(response => {
                dispatch(ec2FetchDataMode(false));
                return response.json();
            })
            .then(histories => {
                return histories.map(history => new ReportService(history.state, history.time).by(by)); 
            })
            .then(dashboard => dispatch(ec2FetchDataSuccess(dashboard, by)));
}

function query(params) {
    return params ? `?resource=EC2&startDate=${params['startDate']}&endDate=${params['endDate']}` : '';
}

export { fetchEc2Dashboard };