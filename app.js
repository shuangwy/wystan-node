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
    const resFailure = (errmessage) => {
        res.writeHead(404, {
            'Content-type': 'text/plain'
        })
        res.write("404 Not Found")
        res.end(JSON.stringify({
            _failure: true,
            ...errmessage
        }))
    }
    res.setHeader('Content-type', 'application/json')
    const url = req.url
    req.path = url.split('?')[0]
    req.query = querystring.parse(url.split('?')[1])
    req.cookie = {}
    const cookieStr = req.headers.cookie
    cookieStr && cookieStr.split(';').forEach(item => {
        if (item) {
            const arr = item.split('=')
            req.cookie[arr[0].trim()] = arr[1].trim()
        }
    })
    console.log(11111, req.cookie)
    getPostData(req).then(postData => {
        if (postData) {
            req.body = JSON.parse(postData)
        }
        const blogData = handleBlogRouter(req, res)
        if (blogData) {
            blogData.then(response => {
                if (response && response.status === 'success') {
                    res.end(JSON.stringify({
                        ...response
                    }))
                    return
                } else {
                    resFailure(response)
                }
            }).catch(err => {
                resFailure(err)
            })
        }
        const userData = handleUserRouter(req, res)
        if (userData) {
            userData.then(response => {
                if (response && response.status === 'success') {
                    // res.writeHead(200, {
                    //     'Set-Cookit':['item=123; path=/; httpOnly']
                    // })
                    res.end(JSON.stringify({
                        ...response
                    }))
                    return
                } else {
                    resFailure(response)
                }
            }).catch(err => {
                resFailure(err)
            })
        }
    })
}

module.exports = serverHandle