import express from 'express';
import urlRoute from './routes/url.js';
import { connectToDB } from './mongoConnect.js';
import path from 'path';
import staticRoute from './routes/staticRouter.js'
import userRoute from './routes/user.js'
import cookieParser from 'cookie-parser'
import {checkAuthentication, restrictTo} from './middlewares/auth.js'

connectToDB('mongodb://127.0.0.1:27017/short-url')
const app = express();
const PORT = 3000;
app.set('view engine','ejs') //telling express that we are using ejs as template engine
app.set('views', path.resolve('./views')) //telling express that all views files are under this folder

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: false})) //we are accepting json as well as form data
app.use(checkAuthentication)
app.use('/', staticRoute)
app.use('/url', restrictTo(["ADMIN", "NORMAL"]), urlRoute) //inline middleware, it will check for /url path, then check for that middleware then only route to urlROute
//so it will only open it if and only if user is logged in
app.use('/user',userRoute)
app.listen(PORT, ()=>{
    console.log(`Server is runing on port ${PORT}`);
})

//TODO: Check for authentication issue that even after login it is asking for us to login again, maybe it will be solved by using jwt