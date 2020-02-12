const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {

    console.log('MIDDLEWARE')

    const token = req.header('x-auth-token')

    if(!token) return res.status(401).json({
        msg: 'No token, authorization denied'
    })

    try {
        const decoded = jwt.verify(token, 'secrettoken')
        req.user = decoded.user;
        
        next()

    } catch (error) {
        console.log(error.message);
        res.status(500).json({msg: 'Token is not valid'})
    }


    
}