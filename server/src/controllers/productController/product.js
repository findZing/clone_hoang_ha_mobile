import { v4 } from "uuid";
import { Product } from "../../model/product";

const productController = {
    getAllProducts: async (req, res) => {
        try {
            const products = await Product.find();
            // console.log(products)
            return res.status(200).json({
                err: 0,
                products,
            });
        }
        catch (err) {
            return res.status(500).json({
                err: 1,
                msg: err
            })
        }
    },
    addProduct: async (req, res) => {
        try {
            const checkProduct = await Product.findOne({name: req.body.name})

            if(checkProduct) return res.status(404).json('Product has been created')

            const newProduct = new Product({
                name: req.body.name,
                price: req.body.price,
                store: req.body.store,
                images: req.body.images
            })

            const saveProduct = await newProduct.save()

            return res.status(200).json({
                err: 0,
                saveProduct
            })
        }
        catch (err) {
            return res.status(500).json({
                err: 1,
                msg: err
            })
        }
    },
    updateProduct: async (req, res) => {
        try {
            const product = await Product.findById(req.body._id)

            console.log(product)
            if(!product) return res.status(404).json('Product does not exist')

            await product.updateOne({
                $set: req.body
            })

            return res.status(200).json({
                err: 0,

            })
        } catch (err) {
            return res.status(500).json({
                err: 1,
                msg: err
            })
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const product = await Product.findOneAndDelete({name: req.body.name})

            return res.status(200).json({
                err: 0,

            })
        } catch (err) {
            return res.status(500).json({
                err: 1,
                msg: err
            })
        }
    },
    getProduct: async (req, res) => {
        try {
            const id = req.query.productId
            const product = await Product.findById(id)

            return res.status(200).json({
                err: 0,
                product
            })
        }
        catch(err){
            return res.status(500).json({
                err: 1,
                msg: err
            })
        }
    },
    searchProduct: async (req, res) => {
        try {
            const search = req.query.name

            const products = await Product.find({ name: {$regex: search} })

            return res.status(200).json({
                err: 0,
                products
            })
        } catch (err) {
            res.status(200).json(err)
            
        }
    }    
}

export default productController;