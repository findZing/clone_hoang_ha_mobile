
import authRouter from './auth'
import productRouter from './product'

export const initRouter = (app) => {
    app.use('/api/v1/auth', authRouter)
    app.use('/api/v1/product', productRouter)
    
    return app.use('/', (req, res) => {
        res.send('Send on')
    })
}