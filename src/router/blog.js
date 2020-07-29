const {
    getList
} = require('../controller/blog')
const {SuccessModel,errorModel}  = require('../model/resModel')
const handleBlogRoute = (req, res) => {
    const method = req.method
    console.log('ptath', req.path)
    if (method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        const listData = getList(author, keyword)
        return new SuccessModel(listData)
    }
    if (method === 'GET' && req.path === '/api/blog/detail') {
        return {
            msg: 'this. is detail api'
        }
    }
    if (method === 'POST' && req.path === '/api/blog/update') {
        return {
            msg: 'this is update blog'
        }
    }
    if (method === 'POST' && req.path === '/api/blog/delete') {
        return {
            msg: 'this is delete blog'
        }
    }
}

module.exports = handleBlogRoute