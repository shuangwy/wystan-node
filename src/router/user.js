const {
    login
} = require('../controller/user')
const {
    SuccessModel,
    ErrorModel
} = require('../model/resModel')
const handleUserRouter = (req, res) => {
    const method = req.method
    if (method === 'POST' && req.path === '/api/user/login') {
        const res = login(req.body)
        if (res) {
            return new SuccessModel('login success')
        } else {
            return new ErrorModel('login failure')
        }

    }
}

module.exports = handleUserRouter