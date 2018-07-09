import promise from 'bluebird';
import pg from 'pg-promise';
import config from '../Config/config'

const connection = {
    pool: null
} 

function connect() {
    const initOptions = {
        promiseLib: promise
    };

    const pgb = pg(initOptions)

    connection.pool = pgb({
        host: config.database.host,
        port: config.database.port,
        user: config.database.user,
        password: config.database.password,
        database: config.database.database
    });
}

function get() {
    return connection.pool;
}

export { connect, get };

// connection.pool.any('SELECT * FROM history')
// .then(data => {
//     console.log(data)
// })
// .catch(error => {
//     console.error(error)
// });
// console.log(connection.pool);