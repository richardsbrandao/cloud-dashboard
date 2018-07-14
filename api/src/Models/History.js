import { get } from '../Config/database'

class History {
    constructor(resource, state, time) {
        this.resource = resource;
        this.state = state;
        this.time = time;
    }

    static findBy(filter) {
        const sql = `SELECT * FROM history ${filter.toSql()} ORDER BY time DESC`
        return get().query(sql, filter.toParams());
    }

    static create(history) {
        const sql = 'INSERT INTO history (resource, state) VALUES ($1, $2) RETURNING id';
        return get().one(
            sql, 
            [history.resource, history.state]
        )
    }
}

export default History;