//static router is for frontend routes
import { Router } from "express";
import URL from "../models/url.js";

const router = Router();

router.get('/',async (req, res)=>{
    const allurl =await  URL.find({});
    return res.render('home',{
        urls: allurl
    })
})

router.get('/signup', (req, res)=>{
    return res.render('signup')
})

router.get('/loginPage',(req, res)=>{
    return res.render('login')
})

export default router;