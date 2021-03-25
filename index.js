const http = require('http')
const serverHandle = require('./app')
const server = http.createServer(serverHandle)
server.listen(8080, () => {
    console.log('listening on 8080 port')
})