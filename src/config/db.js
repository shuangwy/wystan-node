const env = process.env.NODE_ENV

let MYSQL_CONF
let REDIS_CONF

if (env === 'dev') {
    MYSQL_CONF = {
        host: '127.0.0.1',
        user: 'root',
        password: 'Wang@123',
        port: '3306',
        database: 'wystanblog'
    }
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}
if (env === 'production') {
    MYSQL_CONF = {
        host: '127.0.0.1',
        user: 'root',
        password: 'Wang@123',
        port: '3306',
        database: 'wystanblog'
    }
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}