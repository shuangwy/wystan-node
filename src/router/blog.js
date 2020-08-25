const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
} = require('../controller/blog')
const {
    SuccessModel,
    ErrorModel
} = require('../model/resModel')

const loginCheck = (req) => {
    if (!req.session.username) {
        return Promise.resolve(new ErrorModel('user is not login'))
    }
}

const handleBlogRoute = (request, res) => {
    const method = request.method
    const id = request.query.id
    // get list
    if (method === 'GET' && request.path === '/api/blog/list') {
        // const loginResult = loginCheck(request)
        // if (loginResult) {
        //     return loginResult
        // }
        const author = request.query.author || ''
        const keyword = request.query.keyword || ''
        return getList(author, keyword).then(res => {
            return new SuccessModel(res)
        }).catch(err => {
            return new ErrorModel(err)
        })
    }
    if (method === 'GET' && request.path === '/api/blog/detail') {
        const loginResult = loginCheck(request)
        if (loginResult) {
            return loginResult
        }
        return getDetail(id).then(res => {
            return new SuccessModel(res)
        })

    }
    // add
    if (method === 'POST' && request.path === '/api/blog/addnewBlog') {
        const blogData = request.body
        const loginResult = loginCheck(request)
        if (loginResult) {
            return loginResult
        }
        request.body.author = request.session.username
        return newBlog(blogData).then(res => {
            return new SuccessModel(res)
        }).catch(err => {
            return new ErrorModel(err)
        })
    }
    // update
    if (method === 'POST' && request.path === '/api/blog/update') {
        const loginResult = loginCheck(request)
        if (loginResult) {
            return loginResult
        }
        const blogData = request.body
        return updateBlog(id, blogData).then(res => {
            if (res) {
                return new SuccessModel('update success')
            }
            return new ErrorModel('update failure')
        })
    }
    // delete
    if (method === 'GET' && request.path === '/api/blog/delete') {
        const loginResult = loginCheck(request)
        if (loginResult) {
            return loginResult
        }
        const author = request.session.username
        return deleteBlog(id, author).then(res => {
            if (res) {
                return new SuccessModel('delete success')
            }
            return new ErrorModel('delete failure')
        })
    }
}

module.exports = handleBlogRoute