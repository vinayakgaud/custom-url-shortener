import express from 'express';
import urlRoute from './routes/url.js';
import { connectToDB } from './mongoConnect.js';
import path from 'path';
import staticRoute from './routes/staticRouter.js'

connectToDB('mongodb://127.0.0.1:27017/short-url')
const app = express();
const PORT = 3000;
app.set('view engine','ejs') //telling express that we are using ejs as template engine
app.set('views', path.resolve('./views')) //telling express that all views files are under this folder

app.use(express.json())
app.use(express.urlencoded({extended: false})) //we are accepting json as well as form data
app.use('/', staticRoute)
app.use('/url', urlRoute)
app.listen(PORT, ()=>{
    console.log(`Server is runing on port ${PORT}`);
})