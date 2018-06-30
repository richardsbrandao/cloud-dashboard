import { Actions } from '../Config/constants'
import { credentials } from '../Config';

import EcacheService from '../Services/EcacheService';
import ReportService from '../Services/ReportService';

const ecacheService = new EcacheService(credentials)

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

function fetchEcacheDashboard(by) {
    return (dispatch) => {
        dispatch(ecacheFetchDataMode(true));

        // dispatch(ecacheFetchDataMode(false));
        // const instances = ecacheService.getInstances();
        // const result = new ReportService(instances).by(by);
        // return result;
        ecacheService.getInstances()
            .then((instances) => {
                dispatch(ecacheFetchDataMode(false));
                return new ReportService(instances).by(by); 
            })
            .then((dashboard) => dispatch(ecacheFetchDataSuccess(dashboard, by)))
    }
}

export { fetchEcacheDashboard };