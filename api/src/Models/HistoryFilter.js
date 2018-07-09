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
            new Date(startDate[0], startDate[1]-1, startDate[2], 0, 0, 0),
            new Date(endDate[0], endDate[1]-1, endDate[2], 0, 0, 0)
        ]
    }
}

export default HistoryFilter;