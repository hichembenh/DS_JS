import express from 'express'
import bodyParser from 'body-parser'
import mongoose from "mongoose";
import cors from 'cors'
import dotenv from "dotenv";

import userRoutes from './routes/userRoute.js'

dotenv.config({silent: process.env.NODE_ENV === 'production'});

const app = express()

app.use(bodyParser.json({limit: '30mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))
app.use(cors());

app.use('/', userRoutes)

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => app.listen(process.env.PORT, () => console.log(`Server Running on Port: http://localhost:${process.env.PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));

