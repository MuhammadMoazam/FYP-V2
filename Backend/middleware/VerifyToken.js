require('dotenv').config()
const jwt = require('jsonwebtoken')
const { sanitizeUser } = require('../utils/SanitizeUser')

exports.verifyToken = async (req, res, next) => {
    try {
        // extract the token from request cookies
        const token = req.headers.authorization

        // if token is not there, return 401 response
        if (!token) {
            return res.status(401).json({ message: "Token missing, please login again" })
        }

        // verifies the token 
        const decodedInfo = jwt.verify(token, process.env.SECRET_KEY)

        if (decodedInfo) {
            req.user = decodedInfo.user
            next()
        }

        // if token is invalid then sends the response accordingly
        else {
            return res.status(401).json({ message: "Invalid Token, please login again" })
        }

    } catch (error) {

        console.log(error);

        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: "Token expired, please login again" });
        }
        else if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: "Invalid Token, please login again" });
        }
        else {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}