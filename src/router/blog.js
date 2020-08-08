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

const handleBlogRoute = (request, res) => {
    const method = request.method
    const id = request.query.id
    if (method === 'GET' && request.path === '/api/blog/list') {
        const author = request.query.author || ''
        const keyword = request.query.keyword || ''
        return getList(author, keyword).then(res => {
            return new SuccessModel(res)
        }).catch(err => {
            return new ErrorModel(err)
        })

    }
    if (method === 'GET' && request.path === '/api/blog/detail') {
        return getDetail(id).then(res => {
            return new SuccessModel(res)
        })

    }
    // add
    if (method === 'POST' && request.path === '/api/blog/addnewBlog') {
        const blogData = request.body
        request.body.author = "wsanshaung"
        return newBlog(blogData).then(res => {
            return new SuccessModel(res)
        }).catch(err => {
            return new ErrorModel(err)
        })
    }
    // update
    if (method === 'POST' && request.path === '/api/blog/update') {
        const blogData = request.body
        return updateBlog(id, blogData).then(res => {
            if (res) {
                return new SuccessModel('update success')
            }
            return new ErrorModel('update failure')
        })
    }
    if (method === 'GET' && request.path === '/api/blog/delete') {
        const author='zhangsan'
        return deleteBlog(id, author).then(res=>{
            if (res) {
                return new SuccessModel('delete success')
            }
            return new ErrorModel('delete failure')
        })
    }
}

module.exports = handleBlogRoute