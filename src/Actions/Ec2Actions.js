import { Actions } from '../Config/constants'
import { credentials } from '../Config';

import Ec2Service from '../Services/Ec2Service';
import ReportService from '../Services/ReportService';

const ec2Service = new Ec2Service(credentials)

function ec2FetchDataMode(loading) {
    return {
        type: Actions.EC2_LOADING,
        loading
    }
}

function ec2FetchDataError(error) {
    return {
        type: Actions.EC2_ERROR,
        error
    }
}

function ec2FetchDataSuccess(dashboard, by) {
    return {
        type: Actions.EC2_DASHBOARD,
        dashboard,
        by
    }
}

function fetchEc2Dashboard(by) {
    return (dispatch) => {
        dispatch(ec2FetchDataMode(true));

        ec2Service.getInstances()
            .then((instances) => {
                dispatch(ec2FetchDataMode(false));
                return new ReportService(instances).by(by); 
            })
            .then((dashboard) => dispatch(ec2FetchDataSuccess(dashboard, by)))
    }
}

export { fetchEc2Dashboard };