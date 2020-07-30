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
const handleBlogRoute = (req, res) => {
    const method = req.method
    const id = req.query.id
    if (method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        const listData = getList(author, keyword)
        return new SuccessModel(listData)
    }
    if (method === 'GET' && req.path === '/api/blog/detail') {
        const data = getDetail(id)
        return new SuccessModel({
            data
        })
    }
    // add
    if (method === 'POST' && req.path === '/api/blog/addnewBlog') {
        const blogData = req.body
        const data = newBlog(blogData)
        return new SuccessModel({
            data
        })
    }
    // update
    if (method === 'POST' && req.path === '/api/blog/update') {
        const blogData = req.body
        const result = updateBlog(id, blogData)
        if (result) {
            return new SuccessModel(result)
        } else {
            return new ErrorModel('update failure')
        }
    }
    if (method === 'GET' && req.path === '/api/blog/delete') {
        if (deleteBlog(id)) {
            return new SuccessModel(deleteBlog(id))
        } else {
            return new ErrorModel('delete failure')
        }
    }
}

module.exports = handleBlogRoute