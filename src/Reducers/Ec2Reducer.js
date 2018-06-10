import { Actions } from '../Config/constants';
import Ec2Service from '../Services/Ec2Service';
import ReportService from '../Services/ReportService';
import { credentials } from '../Config';

function handleAction(state, action) {
    switch (action.type) {
        case Actions.DASHBOARD_INSTANCE:
            return createInitialDashboard(state);
        case Actions.CHANGE_DASHBOARD_INSTANCE:
            return changeDashboardInstance(action, state);
        default:
            return state;
    }
}

function createInitialDashboard(state) {
    const instances = new Ec2Service(credentials).getInstances();
    const dashboard = new ReportService(instances).by(state.filter);
    return { instances, dashboard, filter: state.filter };
}

function changeDashboardInstance(action, state) {
    const dashboard = new ReportService(state.instances).by(action.by);
    return { instances: state.instances, dashboard, filter: action.by };
}

export default (state = {}, action) => {
    return Object.assign({}, state, handleAction(state, action));
}