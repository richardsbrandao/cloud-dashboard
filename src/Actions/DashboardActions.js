import { Actions } from '../Config/constants'

function dashboardInstances(by) {
    return { type: Actions.DASHBOARD_INSTANCE, by };
}

function changeDashboardByFilter(by, instances) {
    return { type: Actions.DASHBOARD_INSTANCE, by, instances };
}

export { dashboardInstances, changeDashboardByFilter };