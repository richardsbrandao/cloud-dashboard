import { get } from '../Config/database'

class History {
    static findBy(filter) {
        const sql = `SELECT * FROM history ${filter.toSql()}`
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