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
        return getList(author, keyword).then(res => {
            return new SuccessModel(res)
        }).catch(err => {
            return new ErrorModel(err)
        })

    }
    if (method === 'GET' && req.path === '/api/blog/detail') {
        return getDetail(id).then(res => {
            return new SuccessModel(res)
        })

    }
    // add
    if (method === 'POST' && req.path === '/api/blog/addnewBlog') {
        const blogData = req.body
        req.body.author = "wsanshaung"
        return newBlog(blogData).then(res => {
            return new SuccessModel(res)
        }).catch(err => {
            return new ErrorModel(err)
        })
    }
    // update
    if (method === 'POST' && req.path === '/api/blog/update') {
        const blogData = req.body
        return updateBlog(id, blogData).then(res => {
            if (res) {
                return new SuccessModel('update success')
            }
            return new ErrorModel('update failure')
        })
    }
    if (method === 'GET' && req.path === '/api/blog/delete') {
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