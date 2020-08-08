const {
    exec
} = require('../db/mysql')
const getList = (author, keyword) => {
    let sql = `select * from blogs where 1=1 `
    if (author) {
        sql += `and author=${author}`
    }
    if (keyword) {
        sql += `and title like '%${keyword}%'`
    }
    sql += `order by createtime desc`
    return exec(sql)
}
const getDetail = (id) => {
    const sql = `select * from blogs where id='${id}'`
    return exec(sql)
}
const newBlog = (blogData = {}) => {
    const {
        title,
        content,
        author
    } = blogData
    const createtime = Date.now()
    if (title && content && author) {
        const sql = `insert into blogs (title,content,author,createtime)
        values('${title}','${content}','${author}', ${createtime})`
        return exec(sql).then(res => {
            return {
                id: res.insertId
            }
        })
    } else {
        return new Promise((resolve, reject) => {
            reject('missing data')
        })
    }
}
const updateBlog = (id, blogData = {}) => {
    const {
        title,
        content
    } = blogData
    const sql = `update blogs set title='${title}',content='${content}' where id=${id}`
    return exec(sql).then(res => {
        if (res.affectedRows > 0) {
            return true
        }
        return false
    })
}
const deleteBlog = (id, author) => {
    const sql = `delete from blogs where id=${id} and author='${author}'`
    return exec(sql).then(res => {
        console.log('res', res)
        if (res.affectedRows > 0) {
            return true
        }
        return false
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}