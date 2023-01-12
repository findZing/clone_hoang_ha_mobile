import { Auth } from '../../model/auth'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const authController = {
    hashPassword: (password) => {
        return bcrypt.hashSync(password, bcrypt.genSaltSync((12)))
    },

    generateAccessToken: (user) => {
        return jwt.sign({
            id: user.id,
            isAdmin: user.isAdmin
        },
            process.env.JWT_ACCESS_TOKEN,
            { expiresIn: '30s' }
        )
    },

    generateRefreshToken: (user) => {
        return jwt.sign({
            id: user.id,
            isAdmin: user.isAdmin
        },
            process.env.JWT_REFRESH_TOKEN,
            { expiresIn: '30d' }
        )
    },

    requestRefreshToken: async (req, res) => {
        const refreshToken = await req.cookies.refreshToken
        console.log(req)
        if (!refreshToken) return res.status(200).json({
            err: 1,
            msg: req.cookies
        })

        jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN, (err, user) => {
            if (err) {
                return res.status(200).json({
                    err: 1,
                })
            }

            console.log(user)
            const newAccessToken = authController.generateAccessToken(user);
            const newRefreshToken = authController.generateRefreshToken(user);
            res.cookie("refreshToken", refreshToken, {
                // httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
            });
            res.status(200).json({
                err: 0,
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            });
        });
    },

    registerUser: async (req, res) => {
        try {
            const checkUser = await Auth.findOne({
                email: req.body.email,
            })

            console.log(checkUser)
            if (checkUser) return res.status(404).json('User has been registered')

            const newUser = new Auth({
                name: req.body.name,
                email: req.body.email,
                password: authController.hashPassword(req.body.password)
            })
            const saveUser = await newUser.save()

            const accessToken = authController.generateAccessToken(saveUser)
            const refreshToken = authController.generateRefreshToken(saveUser)

            res.cookie('refreshToken', refreshToken, {
                // httpOnly: true,
                secure: false,
                path: '/',
                samSite: "strict"
            })

            return res.status(200).json({err:0, saveUser, accessToken, refreshToken })
        } catch (err) {
            return res.status(200).json({
                err: 1,
                msg: err
            })
        }
    },
    loginUser: async (req, res) => {
        try {
            console.log('run')
            const user = await Auth.findOne({
                email: req.body.email,
            })
    
            if(!user) return res.status(404).json("Inccorrect username")

            const validPassword = bcrypt.compareSync(req.body.password, user.password)

            if (!validPassword) {
                return res.status(404).json("Incorrect password")
            }

            const accessToken = authController.generateAccessToken(user)
            const refreshToken = authController.generateRefreshToken(user)

            await res.cookie('refreshToken', refreshToken, {
                // httpOnly: true,
                secure: false,
                path: '/',
                samSite: "strict"
            })

            return res.status(200).json({err:0, user, accessToken, refreshToken })

        } catch (err) {
            return res.status(404).json({
                err: 1,
                msg: err
            })
        }
    },
    logOutUser: async (req, res) => {
        res.clearCookie('refreshToken')
        res.status(200).json({err:0, msg:"Logged out successfully"})
    },
}

export default authController