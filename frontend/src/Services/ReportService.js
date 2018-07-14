import { capitalize } from 'lodash/string'

class ReportService {
    constructor(data, time) {
        this.data = data;
        this.time = time;
    }

    by(field) {
        const report = this.data.reduce((report, current) => {
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

        return {report: report, time: this.time};
    }
}

export default ReportService;