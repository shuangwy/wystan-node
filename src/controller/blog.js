const getList = (author, keywork) => {
    return [{
            id: 1,
            title: 'biaoti1',
            author: 'wy',
            content: '123'
        },
        {
            id: 2,
            title: 'biaoti2',
            author: 'wy2',
            content: '345'
        }
    ]
}
const getDetail = (id) => {
    return {
        id: 1,
        title: 'biaoti1',
        author: 'wy',
        content: '123'
    }
}
const newBlog = (blogData = {}) => {
    return {
        id: 3
    }
}
const updateBlog = (id, blogData = {}) => {
    return true
}
const deleteBlog=(id)=>{
    if(id){
        return true
    }
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}