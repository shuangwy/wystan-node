const redis = require('redis')
const {
    REDIS_CONF
} = require('../config/db')

const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err => {
    console.log(err)
})

const set = (key, val) => {
    if (typeof val === 'object') {
        val = JSON.stringify(val)
    }
    redisClient.set(key, val, redis.print)
}

const get = (key) => {
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                return reject(err)
            }
            if (val === null) {
                return resolve(null)
            }
            try {
                resolve(JSON.parse(val))
            } catch {
                resolve(val)
            }
        })
    })
}

module.exports = {
    get,
    set
}