const {
    login
} = require('../controller/user')

const {
    SuccessModel,
    ErrorModel
} = require('../model/resModel')

const handleUserRouter = (request, res) => {
    const method = request.method
    if (method === 'POST' && request.path === '/api/user/login') {
        const {
            username,
            password
        } = request.body
        return login(username, password).then(data => {
            if (data.username) {
                const {
                    username,
                    realname
                } = data
                request.session.username = username
                request.session.realname = realname
                return new SuccessModel('login success')
            }
            return new ErrorModel('login failure')
        })
    }
    if (method === 'GET' && request.path === '/api/user/login-test') {
        if (request.session.username) {
            return Promise.resolve(new SuccessModel({
                ...request.session
            }))
        } else {
            return Promise.resolve(new ErrorModel('not login'))
        }
    }
}

module.exports = handleUserRouter