const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const getPostData = (req) => {
    return new Promise((resovle, reject) => {
        if (req.method !== "POST") {
            resovle()
            return
        }
        if (req.headers['content-type'] !== 'application/json') {
            resovle()
            return
        }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if (!postData) {
                resovle()
                return
            }
            resovle(postData)
        })
    })
}

const querystring = require('querystring')
const serverHandle = (req, res) => {
    res.setHeader('Content-type', 'application/json')
    const url = req.url
    req.path = url.split('?')[0]
    req.query = querystring.parse(url.split('?')[1])
    getPostData(req).then(postData => {
        if(postData){
            req.body = JSON.parse(postData)
        }
        const blogData = handleBlogRouter(req, res)
        if (blogData && blogData.status === 'success') {
            res.end(JSON.stringify(blogData))
            return
        }
        const userData = handleUserRouter(req, res)
        if (userData && userData.status === 'success') {
            res.end(JSON.stringify(userData))
            return
        }
        res.writeHead(404, {
            'Content-type': 'text/plain'
        })
        res.write("404 Not Found")
        res.end(JSON.stringify({
            _failure: true,
            ...blogData,
            ...userData
        }))
    })
}

module.exports = serverHandle