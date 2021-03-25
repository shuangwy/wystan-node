const crypto = require('crypto')

// secret key
const SECRET_KEY = 'PANAMERA_@123_LOVE_LIN'

function md5(content){
    let md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex')
}
// secret_fun
function generatePassword(password){
    const str = `password=${password}&key=${SECRET_KEY}`
    return md5(str)
}

module.exports={
    generatePassword
}