import express from 'express'
import authController from '../controllers/authController/auth'


const router = express.Router()

router.post('/register', authController.registerUser)
router.post('/login', authController.loginUser)
router.post('/logout', authController.logOutUser)

export default router