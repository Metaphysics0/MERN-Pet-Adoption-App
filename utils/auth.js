const jwt = require('jsonwebtoken')

const secretTokenKey = 'do39ld08d#$'

const ADMIN_STATUS = 2

const createToken = (username) => {
    return jwt.sign({username}, secretTokenKey)
}

const verifyToken = async (token) => {
    try {
       const payload = await jwt.verify(token,secretTokenKey)
       return payload.username;
    } catch(err) {
        return null;
    }
}

/*returns user object from db*/
const getUserFromDB = (email) => {
    if(!email) return {}
    return {email, status:2}
}

const isAdmin = async (req,res,next) => {
    const token = req.headers.authorization.split(' ')[1]
    
    const user = await verifyToken(token)
    const userObj = getUserFromDB(user)

    if(userObj.status === ADMIN_STATUS) {
        next()
    } else {
        res.status(403).send('Error, Forbidden')
    }
}

module.exports = {createToken, verifyToken, getUserFromDB, isAdmin}
