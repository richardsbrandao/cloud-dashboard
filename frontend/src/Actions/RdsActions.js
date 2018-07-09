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

function fetchRdsDashboard(by) {
    return (dispatch) => {
        dispatch(rdsFetchDataMode(true));
        
        fetch(`${api.endpoint}/rds`)
            .then(response => {
                dispatch(rdsFetchDataMode(false));
                return response.json();
            })
            .then(json => {
                return new ReportService(json).by(by); 
            })
            .then(dashboard => dispatch(rdsFetchDataSuccess(dashboard, by)));
    }
}

export { fetchRdsDashboard };