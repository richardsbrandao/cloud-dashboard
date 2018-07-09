import { capitalize } from 'lodash/string'

class ReportService {
    constructor(data) {
        this.data = data;
    }

    by(field) {
        return this.data.reduce((report, current) => {
            const keyField = current[field];
            if(!report[keyField]) {
                report[keyField] = {
                    Stopped: current.State === 'stopped' ? 1 : 0,
                    Running: current.State === 'running' ? 1 : 0
                }
            } else {
                ++report[keyField][capitalize(current.State)]
            }
            return report;
        }, {});
    }
}

export default ReportService;