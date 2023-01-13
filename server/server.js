import express from 'express';
import cors from 'cors';
// import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

import {initRouter} from './src/routes'

require('dotenv').config()
var cookieParser = require('cookie-parser')

const app = express()

// mongoose.connect(process.env.MONGODB_URL, () => {
//     console.log('connect to MongoDB')
// })
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})

app.use(cors({
    origin: ['http://localhost:3000',   process.env.REACT_APP_CLIENT_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    exposedHeaders: ["set-cookie"],
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

initRouter(app)

const PORT = process.env.PORT || 8080
// const listener = app.listen(port, () => {
//     console.log('Server running on port ', port)
// })

mongoose
  .connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to DB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('err', err);
  });