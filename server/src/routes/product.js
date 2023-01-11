import express from 'express'
import productController from '../controllers/productController/product'

import { verifyTokenAndAdmin } from '../middleware/verifyToken'

const router = express.Router()

router.post('/all', productController.getAllProducts)
router.post('/add',verifyTokenAndAdmin, productController.addProduct)
router.post('/delete',verifyTokenAndAdmin, productController.deleteProduct)
router.post('/update',verifyTokenAndAdmin, productController.updateProduct)
router.post('/get', productController.getProduct)
router.post('/search', productController.searchProduct)

export default router