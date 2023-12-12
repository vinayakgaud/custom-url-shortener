import express from 'express';
import urlRoute from './routes/url.js';
import { connectToDB } from './mongoConnect.js';

connectToDB('mongodb://127.0.0.1:27017/short-url')
const app = express();
const PORT = 3000;
app.use(express.json())
app.use('/url', urlRoute)
app.listen(PORT, ()=>{
    console.log(`Server is runing on port ${PORT}`);
})