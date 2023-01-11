import jwt from 'jsonwebtoken'
// import user from '../models/user'

require('dotenv').config()

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization
    const refreshToken = req.cookies.refreshToken

    // console.log(token)
    if(token){
        const accessToken = token.split(' ')[1]
        jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN, (err, user) => {
            if(err) return res.status(200).json({err: 1, msg:'Token is not valid'})

            req.user = user
            next()
        })
    } else {
        return res.status(200).json({err: -1, msg:"You're not authenticated"})
    }
}

export const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        console.log(req.user)
      if (req.user.isAdmin) {
        next();
      } else {
        res.status(403).json("You're not allowed to do that!");
      }
    });
  };