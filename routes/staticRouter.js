//static router is for frontend routes
import { Router } from "express";
import URL from "../models/url.js";
import { restrictTo } from "../middlewares/auth.js";

const router = Router();

router.get('/admin', restrictTo(["ADMIN"]), async (req, res)=>{
    const allurl =await  URL.find({});
    return res.render('home',{
        urls: allurl
    })
})

router.get('/', restrictTo(["ADMIN", "NORMAL"]), async (req, res)=>{
    // if(!req.user) return res.redirect('/login');
    const allurl =await  URL.find({ createdBy: req.user._id });
    return res.render('home',{
        urls: allurl
    })
})

router.get('/signup', (req, res)=>{
    return res.render('signup')
})

router.get('/login',(req, res)=>{
    return res.render('login')
})

export default router;