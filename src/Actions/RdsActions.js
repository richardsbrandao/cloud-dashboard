import { Actions } from '../Config/constants'
import { credentials } from '../Config';

import RdsService from '../Services/RdsService';
import ReportService from '../Services/ReportService';

const rdsService = new RdsService(credentials)

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
        
        rdsService.getInstances()
            .then((instances) => {
                dispatch(rdsFetchDataMode(false))
                return new ReportService(instances).by(by); 
            })
            .then((dashboard) => dispatch(rdsFetchDataSuccess(dashboard, by)))
    }
}

export { fetchRdsDashboard };