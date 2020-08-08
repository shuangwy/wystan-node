const {
    login
} = require('../controller/user')

const {
    SuccessModel,
    ErrorModel
} = require('../model/resModel')

const getCookieExpores = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 1000))
    return d.toGMTString()
}

const handleUserRouter = (req, res) => {
    const method = req.method
    if (method === 'POST' && req.path === '/api/user/login') {
        const {
            username,
            password
        } = req.body
        return login(username, password).then(result => {
            if (result.username === username) {
                res.setHeader('Set-Coookie',
                    `username=${username}; path='/'; httpOnly; expires=${getCookieExpores()}`)
                return new SuccessModel('login success')
            }
            return new ErrorModel('login failure')
        })
    }
    if (method === 'GET' && req.path === '/api/user/login-test') {
        if (req.cookie.username) {
            return Promise.resolve(new SuccessModel('have landed'))
        } else {
            return Promise.resolve(new ErrorModel('not login'))
        }
    }
}

module.exports = handleUserRouter