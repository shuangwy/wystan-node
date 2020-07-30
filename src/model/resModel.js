class BaseModel {
    constructor(data, message) {
        if (typeof data === 'string') {
            this.message = data
            data = null
            message = null
        }
        if (data) {
            this.data = data
        }
        if (message) {
            this.message = message
        }
    }
}

class SuccessModel extends BaseModel {
    constructor(data, message) {
        super(data, message)
        this.status = 'success'
    }
}
class ErrorModel extends BaseModel {
    constructor(data, message) {
        super(data, message)
        this.status = 'failure'
        this._failure = true
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}