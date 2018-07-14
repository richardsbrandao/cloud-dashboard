import moment from 'moment-timezone';
import config from '../Config/config';

class HistoryFilter {
    //apply validation
    constructor(params) {
        this.params = params;
    }

    toSql() {
        const resource = 'resource = $1';
        const startDate = 'time >= $2';
        const endDate = 'time <= $3';
        return `WHERE ${resource} AND ${startDate} AND ${endDate}`;
    }

    toParams() {
        const startDate = this.params.startDate.split('-');
        const endDate = this.params.endDate.split('-');
        return [
            this.params.resource,
            moment(`${this.params.startDate}T00:00:00Z`).tz(config.cron.timezone).toDate(),
            moment(`${this.params.endDate}T23:59:59Z`).tz(config.cron.timezone).toDate()
        ]
    }
}

export default HistoryFilter;