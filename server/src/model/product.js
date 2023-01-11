import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        index: true,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    store: {
        type: [String],
        required: true
    },
    images: {
        type: [String],
        required: true

    }
})

export const Product = mongoose.model('Product', productSchema)